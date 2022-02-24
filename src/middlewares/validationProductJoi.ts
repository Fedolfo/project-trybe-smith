import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().min(3).required()
    .messages({
      'any.required': 'Amount is required',
      'string.base': 'Amount must be a string',
      'string.min': 'Amount must be longer than 2 characters',
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