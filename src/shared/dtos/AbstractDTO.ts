import { type ZodType, ZodError, z } from 'zod';

import { ZodErrorMap } from './CustomErrorMap';

/**
 * @class
 *@description
 */
export abstract class AbstractDTO<Schema extends ZodType> {
  protected zodErrorMap: ZodErrorMap;
  protected data: z.infer<Schema>;

  public constructor(
    data: Record<string, unknown>,
    protected path: Array<Exclude<keyof z.infer<Schema>, symbol>> = [],
  ) {
    this.path = path;
    this.zodErrorMap = new ZodErrorMap();
    this.validate(data);
  }
}
