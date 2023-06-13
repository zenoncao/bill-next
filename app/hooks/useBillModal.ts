import { create } from 'zustand'

interface BillModalStore {
  isOpen: boolean
  isEdit: boolean
  params: {id?: number, name: string, sum: number | undefined}
  onOpen: (isEdit: boolean, params?: {name: string, sum: number | undefined}) => void
  onClose: () => void
}

const useBillModal = create<BillModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  params: {name: '', sum: undefined},
  onOpen: (isEdit, params) => set({isOpen: true, isEdit, params}),
  onClose: () => set({isOpen: false, isEdit: false})
}))


export default useBillModal
