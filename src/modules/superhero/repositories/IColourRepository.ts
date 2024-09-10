import { Colour } from '../infra/typeorm/entities/Colour';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type ColourSaveInput = StrictOmit<Colour, 'id' | 'superhero'>;

export type ColourUpdate = StrictOmit<Colour, 'superhero'>;

interface IColourRepository {
  create(data: ColourSaveInput): Promise<Colour>;
  findById(id: string): Promise<Colour | null>;
  listAll(): Promise<Colour[]>;
  delete(id: string): Promise<Colour | void>;
  update(data: ColourUpdate): Promise<void>;
}

export { IColourRepository };
