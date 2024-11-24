import React from 'react'

import { TNode } from '../typings/tree'
import { FileNode } from './FileNode'
import { FolderNode } from './FolderNode'

interface TreeProps {
  nodes: TNode[]
  depth?: number
}

export const Tree = React.memo(({ nodes, depth = 0 }: TreeProps) => {
  return nodes.map((node) => {
    if (node.type === 'directory') {
      return (
        <FolderNode key={node.id} id={node.id} name={node.name} depth={depth}>
          {node.isExpanded && node.children && <Tree nodes={node.children} depth={depth + 1} />}
        </FolderNode>
      )
    }

    return <FileNode key={node.id} id={node.id} name={node.name} depth={depth} />
  })
})
