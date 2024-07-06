import Bike from './bike.interface';
import { BikeModel } from './bike.model';

const createBikeIntoDb = async (payload: Bike) => {
  const result = await BikeModel.create(payload);
  return result;
};

const getAllBikeIntoDb = async () => {
  const result = await BikeModel.find();
  return result;
};

const getSingleBikeIntoDb = async (id: string) => {
  const result = await BikeModel.findById(id);
  return result;
};

const updateBikeIntoDb = async (id: string, payload: Partial<Bike>) => {
  const result = await BikeModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBikeIntoDb = async (id: string) => {
  const result = await BikeModel.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDb,
  getAllBikeIntoDb,
  getSingleBikeIntoDb,
  updateBikeIntoDb,
  deleteBikeIntoDb,
};
