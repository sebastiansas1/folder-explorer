import React from 'react'

import { cn } from '../utils/style'

type TreeNodeProps = {
  id: string
  className?: string
  children: React.ReactNode
} & React.LiHTMLAttributes<HTMLLIElement>

export const TreeNode = React.memo(({ id, className, children, ...rest }: TreeNodeProps) => {
  return (
    <li
      id={id}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 outline-none ring-1 ring-transparent',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'focus:bg-blue-100 focus:ring-blue-400 focus:hover:bg-blue-200 focus:dark:bg-blue-950 focus:dark:ring-blue-700 focus:dark:hover:bg-blue-900',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  )
})
