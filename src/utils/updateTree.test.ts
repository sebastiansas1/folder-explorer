import { describe, expect, it } from 'vitest'

import { TNode } from '../typings/tree'
import { updateTree } from './updateTree'

describe('updateTree', () => {
  it('should correctly update a nested node', () => {
    const nodes: TNode[] = [
      {
        id: '1',
        name: '1',
        parentId: null,
        type: 'directory',
        children: [
          {
            id: '2',
            name: '2',
            parentId: '1',
            type: 'directory',
            children: [{ id: '3', name: '3', parentId: '2', type: 'file' }],
          },
        ],
      },
    ]

    const expected = [
      {
        id: '1',
        name: '1',
        parentId: null,
        type: 'directory',
        children: [
          {
            id: '2',
            name: '2',
            parentId: '1',
            type: 'directory',
            children: [{ id: '3', name: 'test', parentId: '2', type: 'file' }],
          },
        ],
      },
    ]

    const result = updateTree(nodes, '3', (n) => ({ ...n, name: 'test' }))

    expect(result).toEqual(expected)
  })
})
