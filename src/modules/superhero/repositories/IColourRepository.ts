import { Colour } from '../infra/typeorm/entities/Colour';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type ColourSaveInput = StrictOmit<Colour, 'id' | 'superhero'>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface IColourRepository {
  create(data: ColourSaveInput): Promise<Colour>;
  findById(id: string): Promise<Colour | null>;
  listAll(): Promise<Colour[] | null | Colour>;
  delete(id: string): Promise<Colour | void>;
  update(data: Colour): Promise<Colour | void>;
}

export { IColourRepository };
