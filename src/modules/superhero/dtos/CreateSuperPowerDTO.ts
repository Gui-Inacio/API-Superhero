import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createSuperPowerSchema = z.object({
  powerName: z.string().min(1),
});
export class CreateSuperPowerDTO extends AbstractDTO<
  typeof createSuperPowerSchema
> {
  protected rules() {
    return createSuperPowerSchema;
  }
}

export type CreateSuperPower = z.infer<typeof createSuperPowerSchema>;
