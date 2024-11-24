export type TNode = {
  id: string
  parentId: string | null
  name: string
  type: 'root' | 'directory' | 'file'
  isExpanded?: boolean
  children?: TNode[]
}
