import { CredentialsError } from '@/use-cases/error/credentions-error';
import makeGetUserProfileUseCase from '@/use-cases/factories/make-get-user-profile';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    });
  } catch (err) {
    if (err instanceof CredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
