import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUseCases } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EmailAlreadyExistsError } from '@/use-cases/error/email-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const verifyBodySchemaUsers = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = verifyBodySchemaUsers.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()

    const registerUseCases = new RegisterUseCases(usersRepository)

    await registerUseCases.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
