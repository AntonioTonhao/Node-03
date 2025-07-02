import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import makeValidatedCheckInsUseCase from '@/use-cases/factories/make-validated-check-ins';

export async function validated(request: FastifyRequest, reply: FastifyReply) {
  const validatedParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validatedParamsSchema.parse(request.params);

  const validatedUseCase = makeValidatedCheckInsUseCase();

  await validatedUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
