import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'


interface CreateGymsUsesCasesParams {
 title: string 
 description: string | null
 phone: string | null
 latitude: number
 longitude: number
}

interface CreateGymsUsesCaseRequest {
  gym: Gym
}

export class CreateGymsUsesCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
   description,
   latitude,
   longitude,
   phone,
   title
  }: CreateGymsUsesCasesParams): Promise<CreateGymsUsesCaseRequest> {
    
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}
