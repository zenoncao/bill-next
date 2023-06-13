'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Table, Button, Space, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import MaterialModal from '../components/modals/MaterialModal'

import useMaterialModal from '../hooks/useMaterialModal'

interface MaterialsClientProps {
  materialsList: any[]
}
export interface DataType {
  id: number,
  materialName: string
  price: number | undefined
}

const MaterialsClient: React.FC<MaterialsClientProps> = ({
  materialsList
}) => {
  const router = useRouter()
  const materialModal = useMaterialModal()

  const columns: ColumnsType<DataType> = [
    {
      title: '材料名称',
      dataIndex: 'materialName',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      )
    }
  ]

  const handleEdit = (record: DataType) => {
    materialModal.onOpen(true, record)
  }
  const handleDelete = (id: number) => {
    axios.delete(`/api/materials/${id}`)
      .then(() => {
        message.success('删除成功')
        router.refresh()
      })
      .catch((error) => {
        message.error(error)
      })
  }

  return (
    <div>
      <Button className='mb-4' onClick={() => materialModal.onOpen(false)}>添加材料</Button>

      <Table columns={columns} rowKey="id" dataSource={materialsList}/>

      <MaterialModal />
    </div>
  )
};

export default MaterialsClient;
