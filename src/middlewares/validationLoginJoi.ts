import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().required()
    .messages({
      'any.required': 'Password is required',
    }),
});

let code: number;
export default async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message.match(/is required/)) {
      code = 400;
    }

    const err = { error: error.message };

    return res.status(code).json(err);
  }

  next();
};