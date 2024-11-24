import { TNode } from '../typings/tree'

export const updateTree = (
  nodes: TNode[],
  nodeId: TNode['id'],
  updaterFn: (node: TNode) => Partial<TNode>,
): TNode[] => {
  return nodes.map((n) => {
    if (n.id === nodeId) {
      return { ...n, ...updaterFn(n) }
    }

    if (n.children) {
      return { ...n, children: updateTree(n.children, nodeId, updaterFn) }
    }

    return n
  })
}
