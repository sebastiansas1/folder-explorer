import { createContext, useContext } from 'react'

interface SelectionContextProps {
  selectedNodeId: string | null
  selectNode: (id: string | null) => void
  selectNextNode: () => void
  selectPreviousNode: () => void
  selectParentNode: () => void
  resetSelection: () => void
}

export const SelectionContext = createContext<SelectionContextProps | undefined>(undefined)

export function useSelectionContext() {
  const context = useContext(SelectionContext)
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}
