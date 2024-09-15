import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const signup = async (data: User) => {
//   const { name, email, password, phone, address, role } = data;

//   const existingUser = await UserModel.findOne({ email: email });
//   if (!existingUser) {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       role,
//     };
//     const user = await UserModel.create(newUser);
//     return user;
//   } else {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       'User with this email already exists',
//     );
//   }
// };

const signup = async (data: User) => {
  const { name, email, password, phone, address } = data;

  const existingUser = await UserModel.findOne({ email: email });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if any users exist in the database
    const isFirstUser = (await UserModel.countDocuments()) === 0;
    console.log(isFirstUser);
    const Newrole = isFirstUser ? 'admin' : 'user';
    console.log(Newrole);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: Newrole,
    };

    const user = await UserModel.create(newUser);
    return user;
  } else {
    throw new AppError(
      httpStatus.CONFLICT,
      'User with this email already exists',
    );
  }
};

const login = async (data: User) => {
  const { email, password } = data;
  const existingUser = await UserModel.findOne({ email: email });

  if (!existingUser) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const user = existingUser;
  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
    config.jwt_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return { user, accessToken };
};

const updateUserData = async (id: string, data: Partial<User>) => {
  const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
  return user;
};

const getAllUser = async () => {
  const user = await UserModel.find();
  return user;
};

const deleteUser = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
};

const updateUserDataByAdmin = async (id: string, payload: Partial<User>) => {
  const result = await UserModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  signup,
  login,
  updateUserData,
  getAllUser,
  deleteUser,
  updateUserDataByAdmin,
};
