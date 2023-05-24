const {User} = require("../models/user");
const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");

const register = async (req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);

  if (!newUser) {
    throw HttpError(400, "test!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {email: newUser.email, subscription: newUser.subscription},
  });
};

module.exports = {
  register: controllerWrapper(register),
};
