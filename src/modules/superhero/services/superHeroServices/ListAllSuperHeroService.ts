import { inject, injectable } from 'tsyringe';

import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';

@injectable()
export class ListAllSuperHeroService {
  constructor(
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
  ) {}

  async execute() {
    return await this.superHeroRepository.listAll();
  }
}
