import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';
import { passwordSchema } from '@/shared/infra/http/validators/passwordSchema';

const updateProfileSchema = passwordSchema({
  id: z.string(),
  name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
});

export class UpdateUserDTO extends AbstractDTO<typeof updateProfileSchema> {
  protected rules() {
    return updateProfileSchema;
  }
}

export type UpdateUser = z.infer<typeof updateProfileSchema>;
