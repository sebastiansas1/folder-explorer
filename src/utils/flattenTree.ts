import { TNode } from '../typings/tree'
import { omit } from './omit'

export type NodeWithoutChildren = Omit<TNode, 'children'>

export const flattenTree = (nodes: TNode[], filterFn = (node: TNode) => !!node): NodeWithoutChildren[] => {
  if (nodes.length === 0) return []

  return nodes.flatMap((node) => {
    if (!filterFn(node)) return []

    return [omit(node, ['children']), ...flattenTree(node.children ?? [], filterFn)]
  })
}

// import { TNode } from '../typings/tree'
// import { omit } from './omit'

// export type NodeWithoutChildren = Omit<TNode, 'children'>

// export const flattenTree = (nodes: TNode[], filterChildNodesFn = (node: TNode) => !!node): NodeWithoutChildren[] => {
//   if (nodes.length === 0) return []

//   return nodes.flatMap((node) => {
//     const childNodes = filterChildNodesFn(node) ? (node.children ?? []) : []

//     return [omit(node, ['children']), ...flattenTree(childNodes, filterChildNodesFn)]
//   })
// }
