import { Colour } from '../infra/typeorm/entities/Colour';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type ColourSaveInput = StrictOmit<Colour, 'id' | 'superhero'>;

export type ColourUpdate = StrictOmit<Colour, 'superhero'>;

interface IColourRepository {
  create(data: ColourSaveInput): Promise<Colour>;
  findById(id: string): Promise<Colour | null>;
  listAll(): Promise<Colour[]>;
  update(data: ColourUpdate): Promise<void>;
  delete(id: string): Promise<Colour | void>;
}

export { IColourRepository };
