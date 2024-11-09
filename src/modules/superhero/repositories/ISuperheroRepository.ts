import { Superhero } from '../infra/typeorm/entities/Superhero';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type SuperheroSaveInput = StrictOmit<
  Superhero,
  'id' | 'createdAt' | 'updatedAt' | 'generateUuid'
>;

export type SuperheroUpdate = StrictOmit<
  Superhero,
  'createdAt' | 'updatedAt' | 'generateUuid'
>;

interface ISuperheroRepository {
  create(data: SuperheroSaveInput): Promise<Superhero>;
  findById(id: string): Promise<Superhero | null>;
  listAll(): Promise<Superhero[] | null | Superhero>;
  update(data: SuperheroUpdate): Promise<Superhero | void>;
  delete(id: string): Promise<void>;
}

export { ISuperheroRepository };
