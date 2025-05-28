import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseCasesRequest {
  query:string,
  page:number,
}

interface SearchGymsUseCaseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCaseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page
  }: SearchGymsUseCaseCasesRequest): Promise<SearchGymsUseCaseCaseResponse> {
    const gyms  = await this.gymsRepository.searchGymsQuery(query,page)

    return { gyms }
  }
}
