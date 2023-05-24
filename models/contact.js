const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const {handleMongooseError} = require("../helpers");

const contactMongooseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false}
);

contactMongooseSchema.post("save", handleMongooseError);

const addContactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .messages({"any.required": "missing required name"}),
  email: Joi.string()
    .min(4)
    .max(255)
    .required()
    .email()
    .messages({"any.required": "missing required email"}),
  phone: Joi.string()
    .min(4)
    .max(20)
    .required()
    .messages({"any.required": "missing required phone"}),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({"any.required": "missing field favorite"}),
});

const schemas = {
  addContactSchema,
  updateStatusContactSchema,
};

const Contact = mongoose.model("contact", contactMongooseSchema);

module.exports = {schemas, Contact};
