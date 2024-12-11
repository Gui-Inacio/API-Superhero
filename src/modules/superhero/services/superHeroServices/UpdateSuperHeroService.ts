import { inject, injectable } from 'tsyringe';

import { ISuperheroRepository } from '../../repositories/ISuperheroRepository';
import { UpdateSuperhero } from '../../dtos/UpdateSuperHeroDTO';
import { FindGenderByIdService } from '../genderServices/FindGenderByIdService';
import { FindColourByIdService } from '../colourServices/FindColourByIdService';
import { FindRaceByIdService } from '../raceServices/FindRaceByIdService';
import { FindPublisherByIdService } from '../publisherServices/FindPublisherByIdService';
import { FindAlignmentByIdService } from '../alignmentServices/FindAlignmentByIdService';
import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';

import { FindSuperHeroByIdService } from './FindSuperHeroByIdService';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class UpdateSuperheroService {
  constructor(
    @inject('SuperheroRepository')
    @inject('GenderRepository')
    private readonly superheroRepository: ISuperheroRepository,

    private readonly findSuperheroByIdService: FindSuperHeroByIdService,
    private readonly findGenderByIdService: FindGenderByIdService,
    private readonly findColourByIdService: FindColourByIdService,
    private readonly findRaceByIdService: FindRaceByIdService,
    private readonly findPublisherByIdService: FindPublisherByIdService,
    private readonly findAlignmentByIdService: FindAlignmentByIdService,

    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}
  async execute(data: UpdateSuperhero) {
    const superhero = await this.findSuperheroByIdService.execute(data.id);
    if (!superhero) {
      throw new NotFound('Superhero not found!');
    }

    const gender = await this.findGenderByIdService.execute(data.gender);
    if (!gender) {
      throw new NotFound('Gender not found!');
    }
    const eyeColour = await this.findColourByIdService.execute(data.eyeColour);
    const skinColour = await this.findColourByIdService.execute(
      data.skinColour,
    );
    const hairColour = await this.findColourByIdService.execute(
      data.hairColour,
    );

    if (!hairColour || !skinColour || !eyeColour) {
      throw new NotFound('One or more colour not found!');
    }
    const race = await this.findRaceByIdService.execute(data.race);
    if (!race) {
      throw new NotFound('Race not found!');
    }
    const publisher = await this.findPublisherByIdService.execute(
      data.publisher,
    );
    if (!publisher) {
      throw new NotFound('Publisher not found!');
    }
    const alignment = await this.findAlignmentByIdService.execute(
      data.alignment,
    );
    if (!alignment) {
      throw new NotFound('Alignment not found!');
    }
    const superpowerIds = data.superpowers.map(
      (superpower) => superpower.powerId,
    );
    const superpowers =
      await this.superPowerRepository.findByIds(superpowerIds);
    if (superpowers.length !== superpowerIds.length) {
      throw new NotFound('One or more super powers not found!');
    }
    await this.superheroRepository.update({
      id: superhero.id,
      fullName: data.fullName,
      superheroName: data.superheroName,
      gender,
      race,
      eyeColour,
      hairColour,
      skinColour,
      publisher,
      alignment,
      superpowers,
    });
    return await this.findSuperheroByIdService.execute(superhero.id);
  }
}
