const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
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

  const avatarUrlDefault = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarUrlDefault,
  });

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {user: {email: newUser.email, subscription: newUser.subscription}},
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

  const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: "23h"});
  await User.findByIdAndUpdate(user._id, {token});

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

const getCurrent = async (req, res) => {
  const {email, subscription} = req.user;
  res.json({
    status: "OK",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const logout = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});

  res.status(204).end();
};

const updateSubscription = async (req, res) => {
  const {subscription} = req.body;
  const {_id} = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    {subscription},
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    code: 200,
    data: {contact: result},
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateSubscription: controllerWrapper(updateSubscription),
};
