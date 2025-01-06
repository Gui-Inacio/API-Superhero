import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const heroBattleSchema = z.object({
  publisher1: z.string(),
  publisher2: z.string(),
});

export class HeroBattleDTO extends AbstractDTO<typeof heroBattleSchema> {
  protected rules() {
    return heroBattleSchema;
  }
}
export type HeroBattle = z.infer<typeof heroBattleSchema>;
