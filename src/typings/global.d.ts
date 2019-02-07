import { Request, Response } from 'express';
import { ValidationChain } from 'express-validator/check'

declare interface Endpoint {
  handler: (req: Request, res: Response) => any;
  validations: ValidationChain[];
}