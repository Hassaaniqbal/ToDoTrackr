const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(3).max(30).required().messages({
    'string.pattern.base': 'Username must contain only letters.',
    'string.min': 'Username must be at least 3 characters long.',
    'any.required': 'Username is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Must be a valid email.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  //can change the passwords to be stronger. 
  //and setup error messages like above
});


const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
  }),
});

module.exports = { signupSchema, loginSchema };