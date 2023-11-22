import { Router } from 'express';
import {
  statisticCancellationRate,
  statisticTotalRevenueOrder,
} from '../Controllers/statistic.js';

const router = Router();
router.get('/statisticTotalRevenueOrder', statisticTotalRevenueOrder);
router.get('/statisticCancellationRate', statisticCancellationRate);

export default router;
