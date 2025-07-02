import { FastifyInstance } from 'fastify';
import { create } from './create';
import { VerifyJWT } from '@/http/middlewares/verify-jwt';
import { search } from './search';
import { fetchNearby } from './fetch-nearby';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT);

  app.post('/gyms', create);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', fetchNearby);
}
