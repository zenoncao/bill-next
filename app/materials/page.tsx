import ClientOnly from '../components/ClientOnly'
import MaterialsClient from './MaterialsClient'

import getMaterials from '../actions/getMaterials'

const MaterialsPage = async () => {
  const materialsList = await getMaterials()

  return (
    <ClientOnly>
      <MaterialsClient materialsList={materialsList} />
    </ClientOnly>
  )
};

export default MaterialsPage
