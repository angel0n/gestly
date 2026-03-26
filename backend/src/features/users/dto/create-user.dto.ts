import * as Joi from 'joi';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});