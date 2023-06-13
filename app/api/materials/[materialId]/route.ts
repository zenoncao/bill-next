import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismaService'

interface IParams {
  materialId?: number 
}

export async function PUT(
  request: Request,
) {
  const body = await request.json()
  const { id, materialName, price } = body

  if(!id) {
    throw new Error('无效ID')
  }
  
  const material = await prisma.material.update({
    where: {
      id
    },
    data: {
      materialName,
      price
    },
  })

  return NextResponse.json(material)
}

export async function DELETE(
  request: Request,
  {params}: {params: IParams}
) {
  const { materialId } = params

  if(!materialId) {
    throw new Error('无效ID')
  }

  const material = await prisma.material.delete({
    where: {
      id: Number(materialId)
    }
  })

  return NextResponse.json(material)
}
