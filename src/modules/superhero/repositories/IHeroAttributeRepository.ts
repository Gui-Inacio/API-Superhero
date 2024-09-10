import { HeroAttribute } from '../infra/typeorm/entities/HeroAttribute';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type HeroAttributeSaveInput = StrictOmit<HeroAttribute, 'id'>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface IHeroAttributeRepository {
  create(data: HeroAttributeSaveInput): Promise<HeroAttribute>;
  findById(id: string): Promise<HeroAttribute | null>;
  listAll(): Promise<HeroAttribute[] | null | HeroAttribute>;
  delete(id: string): Promise<void>;
}

export { IHeroAttributeRepository };
