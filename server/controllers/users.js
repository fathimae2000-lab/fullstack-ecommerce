const asyncHandler = require('express-async-handler');
const userRepo = require('../repositories/users');
const ErrorResponse = require('../utlis/errorResponse');
const { hashPassword, verifyPassword } = require('../utlis/passwordHelper.js');
const { createJwt } = require('../utlis/jwtHelper');

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, phone, role_id } = req.body;

  const existing = await userRepo.getUserByUsername(username);

  if (existing.length > 0) {
    return next(new ErrorResponse(`Username ${username} already exists`, 400));
  }

  const hashedPassword = await hashPassword(password);

  const userId = await userRepo.createNewUser( username,email, hashedPassword,phone);

  const token = createJwt(userId);

  return res.status(201).json({
    success: true,
    data: {
      message: "User registered successfully",
      token
    }
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const users = await userRepo.getUserByEmail(email);

  if (users.length === 0) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const user = users[0];

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = createJwt(user.id);

  return res.status(200).json({
    success: true,
    data: {
      message: "Login successful",
      token:token,
       user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    }
  });
});

module.exports = {
  registerUser,
  loginUser
};