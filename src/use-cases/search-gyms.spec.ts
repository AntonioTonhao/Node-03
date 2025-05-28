import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCaseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCaseCase

describe('Get search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCaseCase(gymsRepository)
  })

  it('should to get search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      phone: '33',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      phone: '33',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      page: 1,
      query: 'JavaScript'
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({  title: 'JavaScript Gym' })])
  })

  it('should be able to fetch 20 items for page', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript ${i}`,
        phone: '33',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript 21' }),
      expect.objectContaining({ title: 'JavaScript 22' }),
    ])
  })
})
