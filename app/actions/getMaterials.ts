import prisma from '@/app/libs/prismaService'

export default async function getMaterials() {
  try{
    const materials = await prisma.material.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return materials
  }catch(error: any) {
    throw new Error(error)
  }
}
