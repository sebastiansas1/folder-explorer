import { createContext, useContext } from 'react'

import { TNode } from '../../typings/tree'

interface TreeContextProps {
  nodes: TNode[]
  getNode: (id: string) => TNode | null
  getSiblings: (id: string) => TNode[]
  updateNode: (id: string, updaterFn: (node: TNode) => Partial<TNode>) => void
  resetTree: () => void
}

export const TreeContext = createContext<TreeContextProps | undefined>(undefined)

export function useTreeContext() {
  const context = useContext(TreeContext)
  if (context === undefined) {
    throw new Error('useTree must be used within a TreeProvider')
  }
  return context
}
