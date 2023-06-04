const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      required: true,
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  {versionKey: false, timestamps: true}
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {registerSchema, loginSchema, subscriptionSchema};

const User = model("user", userSchema);

module.exports = {User, schemas};
