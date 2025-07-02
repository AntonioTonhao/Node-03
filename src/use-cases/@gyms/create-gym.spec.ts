import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymsUsesCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymsUsesCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymsUsesCase(gymsRepository);
  });
  it('should to create gym', async () => {
    const { gym } = await sut.execute({
      description: 'Gym Test',
      title: 'Gym Node',
      phone: '33',
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
