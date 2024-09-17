import { Gender } from '../infra/typeorm/entities/Gender';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type GenderSaveInput = StrictOmit<Gender, 'id' | 'superhero'>;

export type GenderUpdate = StrictOmit<Gender, 'superhero'>;

interface IGenderRepository {
  create(data: GenderSaveInput): Promise<Gender>;
  findById(id: string): Promise<Gender | null>;
  listAll(): Promise<Gender[]>;
  delete(id: string): Promise<void>;
  update(data: GenderUpdate): Promise<void>;
}

export { IGenderRepository };
