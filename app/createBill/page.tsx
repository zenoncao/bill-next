import CreateForm from "./CreateForm"
import ClientOnly from "../components/ClientOnly"

const CreateBillPage = () => {
  return (
    <ClientOnly>
      <CreateForm />
    </ClientOnly>
  )
}

export default CreateBillPage
