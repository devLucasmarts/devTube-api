import { Router } from 'express';
import { signup } from '../controllers/authController';
import validationUser from '../middlewares/authMiddlewares';

const router = Router();

router.post("/api/auth/signup", validationUser, signup);

router.post("/api/auth/signin", );

router.post("/api/auth/google", );

export default router;
