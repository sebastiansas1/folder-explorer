import { ChevronRightIcon, FolderClosedIcon, FolderOpenIcon } from 'lucide-react'
import React from 'react'

import { useSelectionContext } from '../context/SelectionContext'
import { useTreeContext } from '../context/TreeContext'
import { useTreeItemProps } from '../hooks/useTreeItemProps'
import { cn } from '../utils/style'
import { NodeGutter } from './NodeGutter'
import { Text } from './Text'
import { TreeNode } from './TreeNode'

interface FolderNodeProps {
  id: string
  name: string
  depth: number
  children: React.ReactNode
}

export const FolderNode = ({ id, name, depth, children }: FolderNodeProps) => {
  const treeItemProps = useTreeItemProps({ id, depth })

  const { getSiblings, getNode } = useTreeContext()
  const { selectedNodeId } = useSelectionContext()

  const isExpanded = treeItemProps['aria-expanded']

  const isSiblingOfSelectedNode = getSiblings(id).some((n) => n.id === selectedNodeId)
  const isSelectingParent = getNode(id)?.parentId === selectedNodeId

  return (
    <>
      <TreeNode id={id} {...treeItemProps}>
        <NodeGutter size={depth} isActive={depth > 1 && (isSelectingParent || isSiblingOfSelectedNode)} />
        <ChevronRightIcon className={cn('size-4', isExpanded && 'rotate-90')} />
        <FolderIcon className="size-4" isExpanded={isExpanded} />
        <Text>{name}</Text>
      </TreeNode>
      {isExpanded && children}
    </>
  )
}

interface FolderIconProps {
  isExpanded: boolean
  className?: string
}

const FolderIcon = ({ isExpanded, className }: FolderIconProps) => {
  return isExpanded ? <FolderOpenIcon className={className} /> : <FolderClosedIcon className={className} />
}
