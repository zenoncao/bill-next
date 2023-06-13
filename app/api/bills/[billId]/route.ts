import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismaService'

interface IParams {
  billId?: number
}

export async function PUT(
  request: Request
) {
  const body = await request.json()
  const {id, name, sum} = body

  if(!id) {
    throw new Error('无效ID')
  }

  const bill = await prisma.bill.update({
    where: {
      id
    },
    data: {
      name,
      sum
    }
  })

  return NextResponse.json(bill)
}

export async function DELETE(
  request: Request,
  {params}: {params: IParams}
) {
  const { billId } = params

  if(!billId){
    throw new Error('无效ID')
  }

  const bill = await prisma.bill.delete({
    where: {
      id: Number(billId)
    }
  })

  return NextResponse.json(bill)
}
