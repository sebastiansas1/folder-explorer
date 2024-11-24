import React, { useCallback, useState } from 'react'

import { useVisibleNodes } from '../../hooks/useVisibleNodes'
import { SelectionContext } from './context'

interface SelectionProviderProps {
  children: React.ReactNode
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const visibleNodes = useVisibleNodes()

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const selectNode = useCallback(
    (id: string | null) => {
      setSelectedNodeId(id)

      if (!id) return

      const el = document.getElementById(id)
      if (!el) return

      el.focus()
    },
    [setSelectedNodeId],
  )

  const selectNextNode = useCallback(() => {
    const currentNodeIdx = visibleNodes.findIndex((n) => n.id === selectedNodeId)
    const nextNodeIdx = currentNodeIdx + 1

    const nextNode = visibleNodes[nextNodeIdx]
    if (!nextNode) return

    selectNode(nextNode.id)
  }, [visibleNodes, selectedNodeId, selectNode])

  const selectPreviousNode = useCallback(() => {
    const currentNodeIdx = visibleNodes.findIndex((n) => n.id === selectedNodeId)
    const previousNodeIdx = currentNodeIdx - 1

    const previousNode = visibleNodes[previousNodeIdx]

    if (!previousNode) return

    selectNode(previousNode.id)
  }, [visibleNodes, selectedNodeId, selectNode])

  const resetSelection = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  const selectParentNode = useCallback(() => {
    const currentNode = visibleNodes.find((n) => n.id === selectedNodeId)
    if (!currentNode?.parentId) return

    selectNode(currentNode.parentId)
  }, [visibleNodes, selectedNodeId, selectNode])

  return (
    <SelectionContext.Provider
      value={{ selectedNodeId, selectNextNode, selectPreviousNode, selectNode, selectParentNode, resetSelection }}
    >
      {children}
    </SelectionContext.Provider>
  )
}
