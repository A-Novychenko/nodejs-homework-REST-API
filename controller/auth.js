const {User} = require("../models/user");
const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");

const register = async (req, res) => {
  const result = await User.create(req.body);

  if (!result) {
    return HttpError(400, "test!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {email: result.email, subscription: result.subscription},
  });
};

module.exports = {
  register: controllerWrapper(register),
};
