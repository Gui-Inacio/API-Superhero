import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createSuperheroBattleSchema = z.object({
  publisherOne: z.string(),
  publisherTwo: z.string(),
});

export class CreateSuperheroBattleDTO extends AbstractDTO<
  typeof createSuperheroBattleSchema
> {
  protected rules() {
    return createSuperheroBattleSchema;
  }
}

export type CreateSuperheroBattle = z.infer<typeof createSuperheroBattleSchema>;
