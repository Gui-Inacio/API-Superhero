import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateAlignmentSchema = z.object({
  id: z.string(),
  alignment: z.string(),
});

export class updateAlignmentDTO extends AbstractDTO<
  typeof updateAlignmentSchema
> {
  protected rules() {
    return updateAlignmentSchema;
  }
}
export type UpdateAlignment = z.infer<typeof updateAlignmentSchema>;
