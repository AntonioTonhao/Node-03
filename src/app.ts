import fastify from 'fastify';
import { userRoutes } from '@/http/controller/user/routes';
import { ZodError } from 'zod';
import { env } from 'env';
import fastifyJwt from '@fastify/jwt';
import { gymRoutes } from './http/controller/gyms/routes';
import { checkInRoutes } from './http/controller/check-ins/routes';
import fastifyCookie from '@fastify/cookie';

export const app = fastify();

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie:{
    cookieName: 'refreshToken',
    signed: false,
  },
  sign:{
    expiresIn: '10m'
  },
  
});

app.register(fastifyCookie)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // Outra plataforma de verificação de erros para produção
  }

  return reply.status(500).send({
    message: 'Internal server error',
  });
});
