import React, { useCallback } from 'react'

import { TNode } from '../../typings/tree'
import { flattenTree } from '../../utils/flattenTree'
import { updateTree } from '../../utils/updateTree'
import { TreeContext } from './context'

interface TreeProviderProps {
  nodes: TNode[]
  children: React.ReactNode
}

export function TreeProvider({ nodes: initialNodes, children }: TreeProviderProps) {
  const [nodes, setNodes] = React.useState<TNode[]>(initialNodes)

  const flatNodes = React.useMemo(() => flattenTree(nodes), [nodes])

  const nodesById = React.useMemo(() => {
    return flatNodes.reduce((acc, node) => {
      acc.set(node.id, node)
      return acc
    }, new Map<string, TNode>())
  }, [flatNodes])

  const getNode = useCallback((id: TNode['id']) => nodesById.get(id) ?? null, [nodesById])

  const getSiblings = useCallback(
    (id: TNode['id']) => {
      return flatNodes.filter((n) => n.parentId === getNode(id)?.parentId)
    },
    [flatNodes, getNode],
  )

  const updateNode = useCallback((id: TNode['id'], updaterFn: (node: TNode) => Partial<TNode>) => {
    setNodes((prevNodes) => updateTree(prevNodes, id, updaterFn))
  }, [])

  const resetTree = useCallback(() => {
    setNodes(initialNodes)
  }, [initialNodes])

  return (
    <TreeContext.Provider value={{ nodes, getNode, getSiblings, updateNode, resetTree }}>
      {children}
    </TreeContext.Provider>
  )
}
