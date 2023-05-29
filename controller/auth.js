const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

require("dotenv").config();

const {User} = require("../models/user");
const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");

const {SECRET_KEY} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const {email, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({email});
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURLDefault = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURLDefault,
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

const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const {path: tmpUpload, originalname} = req.file;

  const image = await Jimp.read(tmpUpload);
  image.resize(250, 250);
  await image.writeAsync(`tmp/${originalname}`);

  const filename = `${_id}_s250_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, {avatarURL});

  res.json({
    status: "OK",
    code: 200,
    data: {avatarURL},
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
