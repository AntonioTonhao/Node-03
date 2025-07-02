import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import makeFetchNearbyGymsUseCase from '@/use-cases/factories/make-fetch-nearby-gyms';

export async function fetchNearby(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = fetchNearbyQuerySchema.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
