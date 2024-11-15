import { inject, injectable } from 'tsyringe';

import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';
import { CreateSuperHero } from '../../dtos/CreateSuperHeroDTO';
import { FindPublisherByIdService } from '../publisherServices/FindPublisherByIdService';
import { FindRaceByIdService } from '../raceServices/FindRaceByIdService';
import { FindAlignmentByIdService } from '../alignmentServices/FindAlignmentByIdService';
import { FindColourByIdService } from '../colourServices/FindColourByIdService';
import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';
import { FindGenderByIdService } from '../genderServices/FindGenderByIdService';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class CreateSuperHeroService {
  constructor(
    @inject('SuperheroRepository')
    private readonly superHeroRepository: ISuperheroRepository,
    private readonly findGenderById: FindGenderByIdService,
    private readonly findColourById: FindColourByIdService,
    private readonly findPublisherById: FindPublisherByIdService,
    private readonly findRaceById: FindRaceByIdService,
    private readonly findAlignmentById: FindAlignmentByIdService,

    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}
  async execute(data: CreateSuperHero) {
    const gender = await this.findGenderById.execute(data.gender);
    if (!gender) {
      throw new NotFound('Gender not found!');
    }
    const hairColour = await this.findColourById.execute(data.hairColour);
    const skinColour = await this.findColourById.execute(data.skinColour);
    const eyeColour = await this.findColourById.execute(data.eyeColour);
    if (!hairColour || !skinColour || !eyeColour) {
      throw new NotFound('One or more colors were not found!');
    }

    const publisher = await this.findPublisherById.execute(data.publisher);
    if (!publisher) {
      throw new NotFound('Publisher not found!');
    }
    const race = await this.findRaceById.execute(data.race);
    if (!race) {
      throw new NotFound('Race not found!');
    }
    const alignment = await this.findAlignmentById.execute(data.alignment);
    if (!alignment) {
      throw new NotFound('Alignment not found!');
    }
    const superpowerIds = data.superpowers.map(
      (superpower) => superpower.powerId,
    );
    const superpowers =
      await this.superPowerRepository.findByIds(superpowerIds);
    if (superpowers.length !== superpowerIds.length) {
      throw new NotFound('SuperPower not found!');
    }

    return await this.superHeroRepository.create({
      superheroName: data.superheroName,
      fullName: data.fullName,
      gender,
      alignment,
      superpowers,
      race,
      eyeColour,
      skinColour,
      hairColour,
      publisher,
    });
  }
}
