import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendresponse';
import { UserService } from './user.service';

const signupNewUSer = catchAsync(async (req, res) => {
  console.log('hello' + req.body);
  const result = await UserService.signup(req.body);
  sendResponse(res, {
    statuseCode: 201,
    success: true,
    message: 'User  registered  successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserService.login(req.body);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result.user,
  });
});

const getUserByToken = catchAsync(async (req, res) => {
  // const result = await UserService.getUserByToken(req.body);
  console.log(req.user);
  if (!req.user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this route',
    );
  }
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'User fetched successfully',
    data: req.user,
  });
});

const updateUserData = catchAsync(async (req, res) => {
  if (!req.user) {
    // throw new Error('User not found');
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this route',
    );
  }
  const result = await UserService.updateUserData(req.user._id, req.body);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserController = {
  signupNewUSer,
  loginUser,
  getUserByToken,
  updateUserData,
};
