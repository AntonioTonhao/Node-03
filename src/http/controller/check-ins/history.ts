import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import makeFetchUserCheckInHistoryUseCase from '@/use-cases/factories/make-fetch-user-check-in-history';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = fetchHistoryQuerySchema.parse(request.query);

  const fetchHistoryUseCase = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await fetchHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkIns,
  });
}
