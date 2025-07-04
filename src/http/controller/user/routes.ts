import { FastifyInstance } from 'fastify';

import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';

import { VerifyJWT } from '../../middlewares/verify-jwt';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', { onRequest: [VerifyJWT] }, profile);
}
