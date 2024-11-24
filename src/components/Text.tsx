import { cn } from '../utils/style'

type TextProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLSpanElement>

export const Text = ({ children, className, ...rest }: TextProps) => {
  return (
    <span className={cn('font-mono text-sm text-gray-800 dark:text-gray-100', className)} {...rest}>
      {children}
    </span>
  )
}
