const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
  const {email, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({email});
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create({...req.body, password: hashPassword});

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {email: newUser.email, subscription: newUser.subscription},
  });
};

const login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  console.log("user._id", user._id);

  const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: "23h"});
  res.json({
    status: "OK",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
