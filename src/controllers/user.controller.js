const { asyncHandler } = require("../helpers/handError");
const { SuccessResponse } = require("../helpers/responseHandle");
const UserService = require("../services/user.serivce");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  new SuccessResponse({
    message: "Login Success",
    data: await UserService.login({ email, password }),
  }).json(res);
});

const register = asyncHandler(async (req, res) => {
  const { email, password, fullname } = req.body
  new SuccessResponse({
    message: 'Register Success',
    data: await UserService.register({email, fullname, password})
  }).json(res)
});

module.exports = {
  login,
  register
}
