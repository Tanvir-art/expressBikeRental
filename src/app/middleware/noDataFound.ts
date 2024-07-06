// // src/middleware/checkEmptyData.ts
// import { Request, Response, NextFunction } from 'express';

// const checkEmptyData = (req: Request, res: Response, next: NextFunction) => {
//   const data = req.data;

//   if (!data || (Array.isArray(data) && data.length === 0)) {
//     return res.status(200).json({
//       success: false,
//       message: 'No Data Found',
//       data: [],
//     });
//   }

//   next();
// };

// export default checkEmptyData;
