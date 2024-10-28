import { Router } from 'express';
import userRoutes from './v1/userRoutes';

const router = Router();

router.use('/users', userRoutes);

export default router;
