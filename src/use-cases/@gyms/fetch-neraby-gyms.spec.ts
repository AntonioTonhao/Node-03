import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      phone: '33',
      latitude: -20.2646072,
      longitude: -42.0315136,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      phone: '33',
      latitude: -20.2230827,
      longitude: -41.7256393,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.2646072,
      userLongitude: -42.0315136,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({  title: 'Near Gym' })])
  })

  it('not should be able to far gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      phone: '33',
      latitude: -20.2646072,
      longitude: -42.0315136,
    })

     await gymsRepository.create({
      title: 'Far Gym',
      phone: '33',
      latitude: -20.2230827,
      longitude: -41.7256393,
    })

    const {gyms} = await sut.execute({
        userLatitude: -20.189525,
        userLongitude: -42.177449
    })

    expect(gyms).toHaveLength(0)
  })
 
})
