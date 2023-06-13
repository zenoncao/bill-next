import { create } from 'zustand'

interface MaterialModalStore {
  isOpen: boolean
  isEdit: boolean
  params: {id?: number,materialName: string, price: number | undefined}
  onOpen: (isEdit: boolean, params?: {materialName: string, price: number | undefined}) => void
  onClose: () => void
}

const useMaterialModal = create<MaterialModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  params: {materialName: '', price: undefined},
  onOpen: (isEdit, params) => set({isOpen: true, isEdit, params}),
  onClose: () => set({isOpen: false, isEdit: false})
}))


export default useMaterialModal
