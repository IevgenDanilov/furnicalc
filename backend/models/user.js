const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Вкажіть ім'я"],
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Вкажіть email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Вкажіть пароль, не менше 6 символів"],
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
