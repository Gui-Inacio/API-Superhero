import { inject, injectable } from 'tsyringe';

import {
  GetAllSuperhero,
  ISuperheroRepository,
} from '../../repositories/ISuperheroRepository';

@injectable()
export class ListAllSuperHeroService {
  constructor(
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
  ) {}

  async execute(data: GetAllSuperhero) {
    return await this.superHeroRepository.listAll(data);
  }
}
