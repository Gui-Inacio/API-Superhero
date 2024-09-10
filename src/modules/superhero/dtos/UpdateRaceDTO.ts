import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateRaceSchema = z.object({
  id: z.string(),
  race: z.string(),
});

export class UpdatedRaceDTO extends AbstractDTO<typeof updateRaceSchema> {
  protected rules() {
    return updateRaceSchema;
  }
}
export type UpdateRace = z.infer<typeof updateRaceSchema>;
