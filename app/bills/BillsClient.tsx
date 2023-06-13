'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button, Space, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import BillModal from '../components/modals/BillModal'

import useBillModal from '../hooks/useBillModal'

interface BillsClientProps {
  billsList: any[]
}
interface DataType {
  id: number,
  name: string
  sum: number
}

const BillsClient: React.FC<BillsClientProps> = ({
  billsList
}) => {
  const router = useRouter()
  const billModal = useBillModal()

  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '金额',
      dataIndex: 'sum',
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
    billModal.onOpen(true, record)
  }
  const handleDelete =  (id: number) => {
    axios.delete(`/api/bills/${id}`)
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
      <Table columns={columns} rowKey="id" dataSource={billsList}/>

      <BillModal />
    </div>
  )
};

export default BillsClient;
