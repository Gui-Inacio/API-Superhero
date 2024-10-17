import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/user/repositories/IUserRepository';
import { UserRepository } from '../../modules/user/infra/typeorm/repositories/UserRepository';

import { IColourRepository } from '@/modules/superhero/repositories/IColourRepository';
import { ColourRepository } from '@/modules/superhero/infra/typeorm/repositories/ColourRepositiory';
import { IGenderRepository } from '@/modules/superhero/repositories/IGenderRepository';
import { IRaceRepository } from '@/modules/superhero/repositories/IRaceRepository';
import { RaceRepository } from '@/modules/superhero/infra/typeorm/repositories/RaceRepository';
import { GenderRepository } from '@/modules/superhero/infra/typeorm/repositories/GenderRepository';
import { IAlignmentRepository } from '@/modules/superhero/repositories/IAlignmentRepository';
import { AlignmentRepository } from '@/modules/superhero/infra/typeorm/repositories/AlignmentRepository';
import { IPublisherRepository } from '@/modules/superhero/repositories/IPublisherRepository';
import { PublisherRepository } from '@/modules/superhero/infra/typeorm/repositories/PublisherRepository';
import { AttributeRepository } from '@/modules/superhero/infra/typeorm/repositories/AttributeRepository';
import { IAttributeRepository } from '@/modules/superhero/repositories/IAttributeRepository';
import { IHeroAttributeRepository } from '@/modules/superhero/repositories/IHeroAttributeRepository';
import { HeroAttributeRepositoy } from '@/modules/superhero/infra/typeorm/repositories/HeroAttributeRepository';
import { ISuperheroRepository } from '@/modules/superhero/repositories/ISuperheroRepository';
import { SuperheroRepository } from '@/modules/superhero/infra/typeorm/repositories/SuperheroRepository';

container.register<IUserRepository>('UserRepository', UserRepository);
container.register<IColourRepository>('ColourRepository', ColourRepository);
container.register<IGenderRepository>('GenderRepository', GenderRepository);
container.register<IRaceRepository>('RaceRepository', RaceRepository);
container.register<IAlignmentRepository>(
  'AlignmentRepository',
  AlignmentRepository,
);
container.register<IPublisherRepository>(
  'PublisherRepository',
  PublisherRepository,
);
container.register<IAttributeRepository>(
  'AttributeRepository',
  AttributeRepository,
);
container.register<IHeroAttributeRepository>(
  'HeroAttributeRepository',
  HeroAttributeRepositoy,
);
container.register<ISuperheroRepository>(
  'SuperheroRepository',
  SuperheroRepository,
);
