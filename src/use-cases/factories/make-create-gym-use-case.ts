import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository';
import { CreateGymsUsesCase } from '../@gyms/create-gym';

export default function makeCreateGymUseCase() {
  const gymInsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymsUsesCase(gymInsRepository);

  return useCase;
}
