import { FastifyInstance } from 'fastify';
import { createGym } from './create';
import { VerifyJWT } from '@/http/middlewares/verify-jwt';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT);

  app.post('/gyms', createGym);
}
