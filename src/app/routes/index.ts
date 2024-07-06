import { Router } from 'express';
import { BikeRoutes } from '../modules/Bike/bike.route';
import { userRoutes } from '../modules/user/user.route';
// import path from 'path';
import { BookingRoutes } from '../modules/booking/booking.route';
import { meRoutes } from '../modules/user/user.me';

const router = Router();

const moduleRoutes = [
  {
    path: '/bikes',
    route: BikeRoutes,
  },

  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/users',
    route: meRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
