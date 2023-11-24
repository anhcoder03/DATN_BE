import { Router } from 'express';
import {
  statisticCancellationRate,
  statisticTotalCustomer,
  statisticTotalRevenueOrder,
  statisticTotalUser,
} from '../Controllers/statistic.js';

const router = Router();
router.get('/statisticTotalRevenueOrder', statisticTotalRevenueOrder);
router.get('/statisticCancellationRate', statisticCancellationRate);
router.get('/statisticTotalCustomer', statisticTotalCustomer);
router.get('/statisticTotalUser', statisticTotalUser);

export default router;
