import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate';
import { prisma } from 'lib/prisma';

describe('History check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to have a history of check-in', async () => {
    const { token } = await createAndAuthenticate(app);

    const user = await prisma.user.create({
      data:{
        email: 'test@gmail.com',
        name: 'test',
        password_hash: 'test'
      }
    })
    
    const gym = await prisma.gym.create({
      data: {
        title: 'Gym Test',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const checkIn = await prisma.checkIn.create({
      data:{
        gym_id : gym.id,
        user_id: user.id,
      }
    })

    await prisma.checkIn.create({
      data:{
        gym_id : gym.id,
        user_id: user.id,
      }
    })

    const response = await request(app.server)
      .get('/checkIns/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual(
      expect.objectContaining([
        {  },
        { latitude: -27.2092052, longitude: -49.6401091 },
      ]),
    );
  });
});
