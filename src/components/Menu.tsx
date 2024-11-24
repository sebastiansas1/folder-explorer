import { useTreeContext } from '../context/TreeContext'
import { Tree } from './Tree'

export const Menu = () => {
  const { nodes } = useTreeContext()

  return (
    <ul
      id="menu"
      role="tree"
      tabIndex={0}
      className="flex h-[100vh] min-w-[400px] flex-col border-r-[1px] border-r-gray-200 dark:border-r-gray-600"
    >
      <Tree nodes={nodes} />
    </ul>
  )
}
