import { describe, expect, it } from 'vitest'

import { NODE_ID_PREFIX } from '../constants'
import { TNode } from '../typings/tree'
import { NodeWithoutChildren, flattenTree } from './flattenTree'

describe('flattenTree', () => {
  it('should normalize a tree', () => {
    const nonNormalizedTree: TNode[] = [
      {
        id: NODE_ID_PREFIX + 'root',
        parentId: null,
        name: '/',
        type: 'directory',
        isExpanded: false,
        children: [
          {
            id: NODE_ID_PREFIX + 'root-dir',
            parentId: NODE_ID_PREFIX + 'root',
            name: 'dir',
            type: 'directory',
            isExpanded: false,
            children: [
              {
                id: NODE_ID_PREFIX + 'root-dir-something',
                name: 'something',
                type: 'directory',
                isExpanded: false,
                parentId: NODE_ID_PREFIX + 'root-dir',
                children: [
                  {
                    id: NODE_ID_PREFIX + 'root-dir-something-somewhere',
                    parentId: NODE_ID_PREFIX + 'root-dir-something',
                    name: 'somewhere',
                    type: 'file',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]

    const result = flattenTree(nonNormalizedTree)

    const normalizedTree: NodeWithoutChildren[] = [
      {
        id: NODE_ID_PREFIX + 'root',
        parentId: null,
        name: '/',
        type: 'directory',
        isExpanded: false,
      },
      {
        id: NODE_ID_PREFIX + 'root-dir',
        parentId: NODE_ID_PREFIX + 'root',
        name: 'dir',
        type: 'directory',
        isExpanded: false,
      },
      {
        id: NODE_ID_PREFIX + 'root-dir-something',
        parentId: NODE_ID_PREFIX + 'root-dir',
        name: 'something',
        type: 'directory',
        isExpanded: false,
      },
      {
        id: NODE_ID_PREFIX + 'root-dir-something-somewhere',
        parentId: NODE_ID_PREFIX + 'root-dir-something',
        name: 'somewhere',
        type: 'file',
      },
    ]

    expect(result).toEqual(normalizedTree)
  })

  it('should flatten a tree of only directory nodes', () => {
    const nonNormalizedTree: TNode[] = [
      {
        id: NODE_ID_PREFIX + 'root',
        parentId: null,
        name: '/',
        type: 'directory',
        isExpanded: true,
        children: [
          {
            id: NODE_ID_PREFIX + 'root-dir',
            parentId: NODE_ID_PREFIX + 'root',
            name: 'dir',
            type: 'directory',
            isExpanded: true,
            children: [
              {
                id: NODE_ID_PREFIX + 'root-dir-something',
                name: 'something',
                type: 'directory',
                isExpanded: false,
                parentId: NODE_ID_PREFIX + 'root-dir',
                children: [
                  {
                    id: NODE_ID_PREFIX + 'root-dir-something-somewhere',
                    parentId: NODE_ID_PREFIX + 'root-dir-something',
                    name: 'somewhere',
                    type: 'file',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]

    const result = flattenTree(nonNormalizedTree, (node) => node.type === 'directory')

    for (const node of result) {
      expect(node.type).toBe('directory')
    }
  })
})
