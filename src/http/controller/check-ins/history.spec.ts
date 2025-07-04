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

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym Test',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const response = await request(app.server)
      .get('/checkIns/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual(
      expect.objectContaining([
        { latitude: -27.2092052, longitude: -49.6401091 },
        { latitude: -27.2092052, longitude: -49.6401091 },
      ]),
    );
  });
});
