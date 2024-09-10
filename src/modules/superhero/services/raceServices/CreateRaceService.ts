import { inject, injectable } from 'tsyringe';

import { IRaceRepository } from '../../repositories/IRaceRepository';
import { CreateRace } from '../../dtos/CreateRaceDTO';

@injectable()
export class CreateRaceService {
  constructor(
    @inject('RaceRepository')
    private readonly raceRepository: IRaceRepository,
  ) {}

  async execute(data: CreateRace) {
    return await this.raceRepository.create(data);
  }
}
