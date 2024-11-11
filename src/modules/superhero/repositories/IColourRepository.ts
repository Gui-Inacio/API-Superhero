import { Colour } from '../infra/typeorm/entities/Colour';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type ColourSaveInput = StrictOmit<
  Colour,
  'id' | 'eyeColours' | 'hairColours' | 'skinColours'
>;

export type ColourUpdate = StrictOmit<
  Colour,
  'eyeColours' | 'hairColours' | 'skinColours'
>;

interface IColourRepository {
  create(data: ColourSaveInput): Promise<Colour>;
  findById(id: string): Promise<Colour | null>;
  listAll(): Promise<Colour[]>;
  update(data: ColourUpdate): Promise<void>;
  delete(id: string): Promise<void>;
  findByIds(ids: string[]): Promise<Colour[]>;
}

export { IColourRepository };
