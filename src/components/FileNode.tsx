import { FileIcon } from 'lucide-react'

import { useSelectionContext } from '../context/SelectionContext'
import { useTreeContext } from '../context/TreeContext'
import { useTreeItemProps } from '../hooks/useTreeItemProps'
import { NodeGutter } from './NodeGutter'
import { Text } from './Text'
import { TreeNode } from './TreeNode'

interface FileNodeProps {
  id: string
  name: string
  depth: number
}

export const FileNode = ({ id, name, depth }: FileNodeProps) => {
  const treeItemProps = useTreeItemProps({ id, depth })
  const { getSiblings, getNode } = useTreeContext()
  const { selectedNodeId } = useSelectionContext()

  const isSiblingOfSelectedNode = getSiblings(id).some((n) => n.id === selectedNodeId)
  const isSelectingParent = getNode(id)?.parentId === selectedNodeId

  return (
    <TreeNode id={id} {...treeItemProps}>
      <NodeGutter size={depth} isActive={depth > 1 && (isSelectingParent || isSiblingOfSelectedNode)} />
      <div className="min-w-2" />
      <FileIcon className="ml-2 size-4 min-w-4" />
      <Text className="truncate">{name}</Text>
    </TreeNode>
  )
}
