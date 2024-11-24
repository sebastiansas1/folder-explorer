import { cn } from '../utils/style'

interface NodeGutterProps {
  className?: string
  size: number
  isActive: boolean
}

export const NodeGutter = ({ size, isActive, className }: NodeGutterProps) => {
  return (
    <div
      className={cn('h-5 border-r border-r-transparent', isActive && 'border-r-gray-400', className)}
      style={{ minWidth: `${size * 16}px` }}
    />
  )
}
