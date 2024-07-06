import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  data: {
    statuseCode: number;
    success: boolean;
    message: string;
    token?: string;
    data: T;
  },
) => {
  res.status(data.statuseCode).json({
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
