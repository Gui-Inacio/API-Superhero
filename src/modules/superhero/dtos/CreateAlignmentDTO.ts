import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createAlignmentSchema = z.object({
  alignment: z.string().min(1),
});

export class CreateAlignmentDTO extends AbstractDTO<
  typeof createAlignmentSchema
> {
  protected rules() {
    return createAlignmentSchema;
  }
}
export type CreateAlignment = z.infer<typeof createAlignmentSchema>;
