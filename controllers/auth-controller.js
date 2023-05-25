const { User } = require("../models/users");
const { HttpError } = require("../models/helpers");
const { ctrlWrapper } = require("../decorators");

const register = async (req, res) => {
  const newUser = await User.create(req.body);

  res.json({
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
