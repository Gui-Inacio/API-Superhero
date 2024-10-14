import { inject, injectable } from 'tsyringe';

import { IHeroAttributeRepository } from '../../repositories/IHeroAttributeRepository';
import { CreateHeroAttribute } from '../../dtos/CreateHeroAttributeDTO';
import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';
import { IAttributeRepository } from '../../repositories/IAttributeRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class CreateHeroAttributeService {
  constructor(
    @inject('HeroAttributeRepository')
    private readonly heroAttributeRepository: IHeroAttributeRepository,
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
  ) {}

  async execute(data: CreateHeroAttribute) {
    const superhero = await this.superHeroRepository.findById(data.superhero);
    if (!superhero) {
      throw new NotFound('Superhero not found!');
    }
    const attribute = await this.attributeRepository.findById(data.attribute);
    if (!attribute) {
      throw new NotFound('Attribute not found!');
    }
    return await this.heroAttributeRepository.create({
      superhero,
      attribute,
      attribute_value: data.attribute_value,
    });
  }
}
