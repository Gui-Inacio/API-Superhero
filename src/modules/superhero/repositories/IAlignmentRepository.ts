//import { DeleteResult } from 'typeorm';

import { Alignment } from '../infra/typeorm/entities/Alignment';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type AlignmentSaveInput = StrictOmit<Alignment, 'id' | 'superhero'>;
export type AlignmentUpdate = StrictOmit<Alignment, 'superhero'>;

interface IAlignmentRepository {
  create(data: AlignmentSaveInput): Promise<Alignment>;
  findById(id: string): Promise<Alignment | null>;
  listAll(): Promise<Alignment[]>;
  delete(id: string): Promise<void>;
  update(data: AlignmentUpdate): Promise<void>;
}

export { IAlignmentRepository };
