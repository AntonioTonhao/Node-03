import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import makeCreateGymUseCase from '@/use-cases/factories/make-create-gym-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const verifyGymsSchemaBody = z.object({
    title: z.string(),
    phone: z.string().nullable(),
    description: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { description, latitude, longitude, phone, title } =
    verifyGymsSchemaBody.parse(request.body);

  const createGymsUseCase = makeCreateGymUseCase();

  await createGymsUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  });

  return reply.status(201).send();
}
