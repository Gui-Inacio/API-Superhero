import { HeroAttribute } from '../infra/typeorm/entities/HeroAttribute';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type HeroAttributeSaveInput = StrictOmit<
  HeroAttribute,
  'id' | 'updatedAt' | 'createdAt' | 'generateUuid'
>;

export type HeroAttributeUpdate = StrictOmit<
  HeroAttribute,
  'generateUuid' | 'updatedAt' | 'createdAt'
>;

interface IHeroAttributeRepository {
  create(data: HeroAttributeSaveInput): Promise<HeroAttribute>;
  findById(id: string): Promise<HeroAttribute | null>;
  listAll(): Promise<HeroAttribute[] | null | HeroAttribute>;
  delete(id: string): Promise<void>;
  update(data: HeroAttributeUpdate): Promise<void>;
}

export { IHeroAttributeRepository };
