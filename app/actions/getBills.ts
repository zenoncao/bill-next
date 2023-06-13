import prisma from '@/app/libs/prismaService'

export default async function getBills() {
  try{
    const bills = await prisma.bill.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return bills
  }catch(error:any) {
    throw new Error(error)
  }
}
