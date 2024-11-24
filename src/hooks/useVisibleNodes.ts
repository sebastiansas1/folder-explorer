import React from 'react'

import { useTreeContext } from '../context/TreeContext'
import { TNode } from '../typings/tree'
import { flattenTree } from '../utils/flattenTree'

export const useVisibleNodes = () => {
  const { nodes, getNode } = useTreeContext()

  const isParentExpanded = React.useCallback(
    ({ parentId }: TNode) => (parentId ? !!getNode(parentId)?.isExpanded : true),
    [getNode],
  )

  const visibleNodes = React.useMemo(() => flattenTree(nodes, isParentExpanded), [nodes, isParentExpanded])

  return visibleNodes
}
