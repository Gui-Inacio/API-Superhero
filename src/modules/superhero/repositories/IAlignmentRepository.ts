import { Allignment } from '../infra/typeorm/entities/Alignment';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type AllignmentSaveInput = StrictOmit<Allignment, 'id'>;

//export type SuperheroUpdateInput = Pick<Superhero, 'id'>;

interface IAllignmentRepository {
  create(data: AllignmentSaveInput): Promise<Allignment>;
  findById(id: string): Promise<Allignment | null>;
  listAll(): Promise<Allignment[]>;
  delete(id: string): Promise<void>;
}

export { IAllignmentRepository };
