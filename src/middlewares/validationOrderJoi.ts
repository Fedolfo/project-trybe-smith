import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  products: Joi.array().items(Joi.number().required()).required()
    .messages({
      'any.required': 'Products is required',
      'array.base': 'Products must be an array of numbers',
      'array.includesRequiredUnknowns': 'Products can\'t be empty',
    }),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    let code: number;
    if (error.message.match(/is required/)) {
      code = 400;
    } else {
      code = 422;
    }

    const err = { error: error.message };

    return res.status(code).json(err);
  }

  next();
};