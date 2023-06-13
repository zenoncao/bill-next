'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Modal,Form, Input, InputNumber, message } from 'antd'
import useMaterialModal from '@/app/hooks/useMaterialModal'


const MaterialModal = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const materialModal = useMaterialModal()
  const {isEdit, params} = materialModal

  const handleOk = () => {
    if(isEdit) {
      return editRequest()
    }

    addRequest()
  }
  const addRequest = async () => {
    const {materialName, price} = await form.validateFields()

    axios.post('/api/materials', {materialName, price})
    .then(() => {
      materialModal.onClose()
      form.resetFields()
      message.success("添加成功")
      router.refresh()
    })
    .catch((error) => {
      message.error(error)
    })
  }
  const editRequest = async () => {
    const {materialName, price} = await form.validateFields()
    const {id} = params

    axios.put(`/api/materials/${id}`, {id, materialName, price})
    .then(() => {
      materialModal.onClose()
      message.success("编辑成功")
      router.refresh()
    })
    .catch((error) => {
      message.error(error)
    })
  }

  useEffect(() => {
    if(isEdit) {
      const {materialName, price} = params
      form.setFieldsValue({materialName, price})
    }
  }, [isEdit, params])

  return  (
    <Modal 
      title={materialModal.isEdit ? '编辑材料': '添加材料'}
      open={materialModal.isOpen} 
      onCancel={materialModal.onClose} 
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item name="materialName" label="材料名称">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="价格">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default MaterialModal
