import { Superhero } from '../infra/typeorm/entities/Superhero';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type SuperheroSaveInput = StrictOmit<
  Superhero,
  'id' | 'createdAt' | 'updatedAt'
>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface ISuperheroRepository {
  create(data: SuperheroSaveInput): Promise<Superhero>;
  findById(id: string): Promise<Superhero | null>;
  listAll(): Promise<Superhero[] | null | Superhero>;
  update(data: Superhero): Promise<Superhero | void>;
  delete(id: string): Promise<void>;
}

export { ISuperheroRepository };
