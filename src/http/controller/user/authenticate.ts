import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { CredentialsError } from '@/use-cases/error/credentions-error'
import makeAuthenticateUseCase from '@/use-cases/factories/make-authenticate-use-case'


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
    const autenticationUseCase = makeAuthenticateUseCase()

    const { user } = await autenticationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '10m'
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        },
      },
    )

    return reply
    .setCookie('refreshToken', refreshToken,{
      httpOnly:true,
      secure: true,
      path: '/',
      sameSite: true,
    })
    .status(200)
    .send({
      token,
    })
  } catch (err) {
    if (err instanceof CredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
