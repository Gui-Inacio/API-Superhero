import { z } from 'zod';

import { AbstractDTO } from '../../../shared/dtos/AbstractDTO';
import { passwordSchema } from '../../../shared/infra/http/validators/passwordSchema';

const createUSerSchema = passwordSchema({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
});

export class CreateUserDTO extends AbstractDTO<typeof createUSerSchema> {
  protected rules() {
    return createUSerSchema;
  }
}
export type CreateUser = z.infer<typeof createUSerSchema>;
