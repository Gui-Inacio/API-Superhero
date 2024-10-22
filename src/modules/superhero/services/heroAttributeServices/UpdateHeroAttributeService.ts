import { inject, injectable } from 'tsyringe';

import { IHeroAttributeRepository } from '../../repositories/IHeroAttributeRepository';
import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';
import { IAttributeRepository } from '../../repositories/IAttributeRepository';
import { UpdateHeroAttribute } from '../../dtos/UpdateHeroAttributeDTO';

import { FindHeroAttributeByIdService } from './FindHeroAttributeByIdService';

import NotFound from '@/shared/errors/notFound';
import Conflict from '@/shared/errors/conflict';

@injectable()
export class UpdateHeroAttributeService {
  constructor(
    @inject('HeroAttributeRepository')
    private readonly heroAttributeRepository: IHeroAttributeRepository,
    private readonly findHeroAttributeByIdService: FindHeroAttributeByIdService,
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
    @inject('AttributeRepository')
    private readonly attributeRepository: IAttributeRepository,
  ) {}
  async execute(data: UpdateHeroAttribute) {
    const heroAttribute = await this.findHeroAttributeByIdService.execute(
      data.id,
    );

    const superhero = await this.superHeroRepository.findById(data.superhero);
    const attribute = await this.attributeRepository.findById(data.attribute);

    if (!superhero || !attribute) {
      throw new NotFound('Um ou mais dados não foram encontrados!');
    }

    const oldAttribute = heroAttribute.attribute.attributeName;
    if (oldAttribute != attribute.attributeName) {
      const attributeAndHeroExists =
        await this.heroAttributeRepository.findSuperHeroAndAttribute(
          data.superhero,
          data.attribute,
        );
      if (attributeAndHeroExists) {
        throw new Conflict(
          'Já exite este atributo cadastrado para este heroi!',
        );
      }
    }

    await this.heroAttributeRepository.update({
      id: heroAttribute.id,
      attribute_value: data.attribute_value,
      attribute: attribute,
      superhero: superhero,
    });
    return await this.heroAttributeRepository.findById(heroAttribute.id);
  }
}
