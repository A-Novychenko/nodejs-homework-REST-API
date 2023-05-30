const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const {HttpError} = require("../..//helpers");

const {User} = require("../../models/user");

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

module.exports = register;
