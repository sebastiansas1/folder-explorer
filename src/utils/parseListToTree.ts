import { NODE_ID_PREFIX } from '../constants'
import { TNode } from '../typings/tree'
import { isPath } from './assertions'

export const parseListToTree = (paths: string[]): TNode[] => {
  const root: TNode = {
    id: NODE_ID_PREFIX + 'root',
    parentId: null,
    name: 'root',
    type: 'directory',
    isExpanded: true,
    children: [],
  }

  const validPaths = paths.filter(isPath)

  for (const path of validPaths) {
    const parts = path.startsWith('/') ? path.split('/').slice(1) : path.split('/')

    let node = root

    for (const [index, part] of parts.entries()) {
      const existingChild = node.children?.find((c) => c.name === part)

      if (existingChild) {
        node = existingChild
        continue
      }

      const isFile = index === parts.length - 1

      const newChild: TNode = {
        id: `${node.id}-${part}`,
        parentId: node.id,
        name: part,
        ...(isFile ? { type: 'file' } : { type: 'directory', isExpanded: false, children: [] }),
      }

      node.children?.push(newChild)
      node.children?.sort(sortAlphabetically).sort(sortByType)
      node = newChild
    }
  }

  return [root]
}

const sortAlphabetically = (a: TNode, b: TNode) => a.name.localeCompare(b.name)
const sortByType = (a: TNode, b: TNode) => {
  if (a.type === 'directory' && b.type === 'file') return -1
  if (a.type === 'file' && b.type === 'directory') return 1

  return 0
}
