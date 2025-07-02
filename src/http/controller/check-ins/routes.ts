import { FastifyInstance } from 'fastify';
import { VerifyJWT } from '@/http/middlewares/verify-jwt';
import { create } from './create';
import { history } from './history';
import { metrics } from './metrics';
import { validated } from './validated';

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT);

  app.post('/gyms/:gymId/check-ins', create);

  app.get('/checkIns/history', history);
  app.get('/checkIns/metrics', metrics);

  app.patch('/checkIns/:checkInId/validated', validated);
}
