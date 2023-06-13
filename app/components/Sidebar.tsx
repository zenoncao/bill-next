'use client'

import { useRouter, usePathname, redirect } from 'next/navigation'
import { Button, Menu, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect } from 'react'

const items: MenuProps['items'] = [
  {
    label: '新建账单',
    key: '新建账单',
  },
  {
    label: '所有账单',
    key: '所有账单'
  },
  {
    label: '材料管理',
    key: '材料管理'
  },
]
const menuPath = [
  {
    key: '新建账单',
    path: '/createBill'
  },
  {
    key: '所有账单',
    path: '/bills'
  },
  {
    key: '材料管理',
    path: '/materials'
  },
]

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenu: MenuProps['onClick'] = (e) => {
    const path = menuPath.find((menu) => menu.key === e.key)?.path
    if(path) router.push(path)
  }
  const selectedKey = menuPath.find((menu) => menu.path === pathname)?.key

  return (
    <div className='py-4 w-64 h-screen'>
      <Menu selectedKeys={[`${selectedKey}`]} onClick={handleMenu} items={items} className='w-full h-full'/>
    </div>
  )
}

export default Sidebar
