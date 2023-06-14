const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("./helpers");
const Joi = require("joi");

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
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).required().email({ minDomainSegments: 2 }),
});

const emailSchema = Joi.object({
  email: Joi.string().min(6).required().email({ minDomainSegments: 2 }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

module.exports = {
  User,
  schemas,
};
