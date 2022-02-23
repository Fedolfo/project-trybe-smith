import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().min(3).required()
    .messages({
      'any.required': 'Classe is required',
      'string.base': 'Classe must be a string',
      'string.min': 'Classe must be longer than 2 characters',
    }),
  level: Joi.number().strict().greater(0).required()
    .messages({
      'number.base': 'Level must be a number',
      'number.greater': 'Level must be greater than 0',
      'any.required': 'Level is required',
    }),
  password: Joi.string().min(8).required()
    .messages({
      'any.required': 'Password is required',
      'string.base': 'Password must be a string',
      'string.min': 'Password must be longer than 7 characters',
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