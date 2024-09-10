import { inject, injectable } from 'tsyringe';

import { IRaceRepository } from '../../repositories/IRaceRepository';

@injectable()
class DeleteRaceService {
  constructor(
    @inject('RaceRepository')
    private readonly raceRepository: IRaceRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const race = await this.raceRepository.findById(id);
    if (!race) {
      throw new Error('Race not found!');
    }

    await this.raceRepository.delete(id);
  }
}

export default DeleteRaceService;
