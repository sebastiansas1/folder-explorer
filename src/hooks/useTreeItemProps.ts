import { useCallback } from 'react'

import { useSelectionContext } from '../context/SelectionContext'
import { useTreeContext } from '../context/TreeContext'

interface Params {
  id: string
  depth: number
  onSelect?: () => void
}

export const useTreeItemProps = ({ id, depth, onSelect }: Params) => {
  const { getNode, updateNode } = useTreeContext()
  const { selectNode, selectNextNode, selectPreviousNode, selectParentNode } = useSelectionContext()

  const node = getNode(id)

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation()
      updateNode(id, (n) => ({ isExpanded: !n.isExpanded }))
      selectNode(id)
      onSelect?.()
    },
    [id, selectNode, updateNode, onSelect],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space' || e.key === 'ArrowRight') {
        updateNode(id, () => ({ isExpanded: true }))
      }

      if (e.key === 'ArrowLeft') {
        if (node?.type === 'file' || node?.isExpanded === false) {
          selectParentNode()
        } else {
          updateNode(id, () => ({ isExpanded: false }))
        }
      }

      if (e.key === 'ArrowDown') {
        selectNextNode()
      }

      if (e.key === 'ArrowUp') {
        selectPreviousNode()
      }
    },
    [selectNextNode, selectPreviousNode, updateNode, id, node, selectParentNode],
  )

  return {
    role: 'treeitem',
    'aria-label': node?.name,
    'aria-level': depth + 1,
    'aria-expanded': node?.isExpanded ?? false,
    tabIndex: 0,
    onClick,
    onKeyDown,
  }
}
