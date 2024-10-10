import { HeroAttribute } from '../infra/typeorm/entities/HeroAttribute';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type HeroAttributeSaveInput = StrictOmit<HeroAttribute, 'id'>;

export type HeroAttributeUpdate = Pick<
  HeroAttribute,
  'id' | 'attribute_value' | 'superhero' | 'attribute'
>;

interface IHeroAttributeRepository {
  create(data: HeroAttributeSaveInput): Promise<HeroAttribute>;
  findById(id: string): Promise<HeroAttribute | null>;
  listAll(): Promise<HeroAttribute[] | null | HeroAttribute>;
  delete(id: string): Promise<void>;
  update(data: HeroAttributeUpdate): Promise<void>;
}

export { IHeroAttributeRepository };
