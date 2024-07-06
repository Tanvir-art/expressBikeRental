import { BikeServices } from './bike.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendresponse';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDb(req.body);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'Bike added  successfully',
    data: result,
  });
});

const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeIntoDb();
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const result = await BikeServices.updateBikeIntoDb(req.params.id, req.body);
  console.log(result);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const result = await BikeServices.deleteBikeIntoDb(req.params.id);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
};
