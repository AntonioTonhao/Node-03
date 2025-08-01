import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticate(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  });

  const authenticateResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johndoe@example.com',
      password: '123456',
    });

  const { token } = authenticateResponse.body;

  return { token };
}
