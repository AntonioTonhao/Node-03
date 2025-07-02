import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository';
import { SearchGymsUseCaseCase } from '../@gyms/search-gyms';

export default function makeSearchGymsUseCase() {
  const gymInsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCaseCase(gymInsRepository);

  return useCase;
}
