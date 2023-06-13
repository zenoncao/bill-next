'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios'
import { Form, Input, Button, InputNumber, message } from 'antd'

const CreateForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  const handleFinish = (values: {name: string, sum: number}) => {
    axios.post('/api/bills', {name: values.name, sum:values.sum})
      .then(() => {
        message.success('保存成功')
        form.resetFields()
        
        router.push('/bills')
        router.refresh()
      })
      .catch((error) => {
        message.error(error)
      })
  }

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item name="name" label="姓名">
        <Input />
      </Form.Item>
      <Form.Item name="sum" label="金额">
        <InputNumber min={0}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit'>保存账单</Button>
      </Form.Item>
    </Form>
  )
};

export default CreateForm;
