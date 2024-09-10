import { inject, injectable } from 'tsyringe';

import { IRaceRepository } from '../../repositories/IRaceRepository';
import { UpdateRace } from '../../dtos/UpdateRaceDTO';

import { FindRaceByIdService } from './FindRaceByIdService';

@injectable()
export class UpdateRaceService {
  constructor(
    @inject('RaceRepository')
    private readonly raceRepository: IRaceRepository,
    private readonly findRaceByIdService: FindRaceByIdService,
  ) {}

  async execute(data: UpdateRace) {
    const race = await this.findRaceByIdService.execute(data.id);

    await this.raceRepository.update({
      id: race.id,
      race: data.race,
    });
    return await this.raceRepository.findById(race.id);
  }
}
