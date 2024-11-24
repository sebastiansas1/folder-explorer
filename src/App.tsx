import { useState } from 'react'

import { Menu } from './components/Menu'
import { SelectionProvider } from './context/SelectionContext'
import { TreeProvider } from './context/TreeContext'
import { exampleData } from './data'
import { parseListToTree } from './utils/parseListToTree'

function App() {
  const [data] = useState<string[]>(exampleData)
  const nodes = parseListToTree(data)

  if (!nodes) return null

  return (
    <TreeProvider nodes={nodes}>
      <SelectionProvider>
        <Menu />
      </SelectionProvider>
    </TreeProvider>
  )
}

export default App
