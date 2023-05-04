import Joi from 'joi';

export const createSchema = Joi.object().keys({
  title: Joi.string().required(),
  summary: Joi.string().required(),
});

export const updateSchema = Joi.object().keys({
  title: Joi.string(),
  summary: Joi.string(),
});
