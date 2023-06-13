'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Modal,Form, Input, InputNumber, message } from 'antd'
import useBillModal from '@/app/hooks/useBillModal'


const BillModal = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const billModal = useBillModal()
  const {isEdit, params} = billModal

  const handleOk = () => {
    if(isEdit) {
      return editRequest()
    }

    addRequest()
  }
  const addRequest = async () => {
    const {name, sum} = await form.validateFields()

    axios.post('/api/bills', {name, sum})
    .then(() => {
      billModal.onClose()
      form.resetFields()
      message.success("添加成功")
      router.refresh()
    })
    .catch((error) => {
      message.error(error)
    })
  }
  const editRequest = async () => {
    const {name, sum} = await form.validateFields()
    const {id} = params

    axios.put(`/api/bills/${id}`, {id, name, sum})
    .then(() => {
      billModal.onClose()
      message.success("编辑成功")
      router.refresh()
    })
    .catch((error) => {
      message.error(error)
    })
  }

  useEffect(() => {
    if(isEdit) {
      const {name, sum} = params
      form.setFieldsValue({name, sum})
    }
  }, [isEdit, params])

  return  (
    <Modal 
      title={billModal.isEdit ? '编辑账单': '添加账单'}
      open={billModal.isOpen} 
      onCancel={billModal.onClose} 
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item name="name" label="名字">
          <Input />
        </Form.Item>
        <Form.Item name="sum" label="金额">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default BillModal
