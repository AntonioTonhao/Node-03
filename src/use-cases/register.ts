import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'
import { prisma } from 'lib/prisma'

interface RegisterUseCasesParams {
  name: string
  email: string
  password: string
}

export async function registerUseCases({
  name,
  email,
  password,
}: RegisterUseCasesParams) {
  const password_hash = await hash(password, 6)

  const checkUniqueEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (checkUniqueEmail) {
    throw new Error('Email already exists!')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    email,
    name,
    password_hash,
  })
}
