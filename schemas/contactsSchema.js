const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(4).max(255).required().email(),
  phone: Joi.string().min(4).max(20).required(),
});

module.exports = contactsSchema;
