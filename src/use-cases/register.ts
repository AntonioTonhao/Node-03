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

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
