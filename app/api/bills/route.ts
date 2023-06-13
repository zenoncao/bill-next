import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismaService'

export async function POST(request: Request) {
  const body = await request.json()
  const {name, sum} = body
  
  const bill = await prisma.bill.create({
    data: {
      name,
      sum
    }
  })

  return NextResponse.json(bill)
}
