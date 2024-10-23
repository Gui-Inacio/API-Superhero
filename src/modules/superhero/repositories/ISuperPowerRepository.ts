import { Superpower } from '../infra/typeorm/entities/Superpower';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type SuperpowerSaveInput = StrictOmit<Superpower, 'id'>;
export type SuperpowerUpdate = Superpower;

interface ISuperPowerRepository {
  create(data: SuperpowerSaveInput): Promise<Superpower>;
  findById(id: string): Promise<Superpower | null>;
  listAll(): Promise<Superpower[]>;
  delete(id: string): Promise<void>;
  update(data: SuperpowerUpdate): Promise<void>;
}

export { ISuperPowerRepository };
