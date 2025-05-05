import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutenticateUseCase } from '@/use-cases/autentication'
import { CredentialsError } from '@/use-cases/error/credentions-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const verifyBodySchemaAuthenticate = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = verifyBodySchemaAuthenticate.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const autenticationUseCase = new AutenticateUseCase(usersRepository)

    await autenticationUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof CredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
