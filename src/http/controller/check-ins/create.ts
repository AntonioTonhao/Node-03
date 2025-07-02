import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import makeCheckInsUseCase from '@/use-cases/factories/make-check-ins-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string(),
  });

  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInsParamsSchema.parse(request.params);

  const { latitude, longitude } = createCheckInsBodySchema.parse(request.body);

  const createCheckInUseCase = makeCheckInsUseCase();

  await createCheckInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
