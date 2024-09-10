import { Race } from '../infra/typeorm/entities/Race';

import { StrictOmit } from '@/shared/util/types/StrictOmitType';

export type RaceSaveInput = StrictOmit<Race, 'id' | 'superhero'>;

export type RaceUpdate = StrictOmit<Race, 'superhero'>;

interface IRaceRepository {
  create(data: RaceSaveInput): Promise<Race>;
  findById(id: string): Promise<Race | null>;
  listAll(): Promise<Race[]>;
  delete(id: string): Promise<Race | void>;
  update(data: RaceUpdate): Promise<void>;
}

export { IRaceRepository };
