import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateSuperPowerSchema = z.object({
  id: z.string(),
  powerName: z.string(),
});

export class UpdateSuperPowerDTO extends AbstractDTO<
  typeof updateSuperPowerSchema
> {
  protected rules() {
    return updateSuperPowerSchema;
  }
}
export type UpdateSuperPower = z.infer<typeof updateSuperPowerSchema>;
