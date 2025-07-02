import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInHistory } from '../@check-ins/fetch-user-check-in-history';

export default function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInHistory(checkInsRepository);

  return useCase;
}
