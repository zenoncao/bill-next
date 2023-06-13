import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismaService'

export async function POST(request: Request) {
  const body = await request.json()
  const {materialName, price} = body

  const material = await prisma.material.create({
    data: {
      materialName,
      price
    }
  })

  return NextResponse.json(material)
}
