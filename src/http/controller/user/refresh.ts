import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(
  request: FastifyRequest,
  reply: FastifyReply,
) {
    
    await request.jwtVerify({ onlyCookie: true})
    
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '10m'
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
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
 
}
