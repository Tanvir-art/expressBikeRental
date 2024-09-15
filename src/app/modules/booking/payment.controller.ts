import { Request, Response } from 'express';
const confirmation = async (req: Request, res: Response) => {
  res.send(`<h1>Payment Successful</h1>`);
};

export const paymentController = {
  confirmation,
};
