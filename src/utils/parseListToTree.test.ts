import { describe, expect, it } from 'vitest'

import { NODE_ID_PREFIX } from '../constants'
import { parseListToTree } from './parseListToTree'

describe('parseListToTree', () => {
  it('should convert a list of paths to a tree', () => {
    const paths = ['/dir/test', '/dev/null', '/dir/something/somewhere']

    const expectedTree = [
      {
        id: NODE_ID_PREFIX + 'root',
        parentId: null,
        name: '/',
        type: 'directory',
        isExpanded: false,
        children: [
          {
            id: NODE_ID_PREFIX + 'root-dev',
            parentId: NODE_ID_PREFIX + 'root',
            name: 'dev',
            type: 'directory',
            isExpanded: false,
            children: [
              {
                id: NODE_ID_PREFIX + 'root-dev-null',
                parentId: NODE_ID_PREFIX + 'root-dev',
                name: 'null',
                type: 'file',
              },
            ],
          },
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
              {
                id: NODE_ID_PREFIX + 'root-dir-test',
                name: 'test',
                type: 'file',
                parentId: NODE_ID_PREFIX + 'root-dir',
              },
            ],
          },
        ],
      },
    ]

    const tree = parseListToTree(paths)

    expect(tree).toEqual(expectedTree)
  })

  it('should sort paths alphabetically', () => {
    const paths = ['/foo', '/bar', '/baz']

    const tree = parseListToTree(paths)

    const expectedTree = [
      {
        id: NODE_ID_PREFIX + 'root',
        parentId: null,
        name: '/',
        type: 'directory',
        isExpanded: false,
        children: [
          {
            id: NODE_ID_PREFIX + 'root-bar',
            parentId: NODE_ID_PREFIX + 'root',
            name: 'bar',
            type: 'file',
          },
          {
            id: NODE_ID_PREFIX + 'root-baz',
            parentId: NODE_ID_PREFIX + 'root',
            name: 'baz',
            type: 'file',
          },
          {
            id: NODE_ID_PREFIX + 'root-foo',
            parentId: NODE_ID_PREFIX + 'root',
            name: 'foo',
            type: 'file',
          },
        ],
      },
    ]

    expect(tree).toEqual(expectedTree)
  })
})
