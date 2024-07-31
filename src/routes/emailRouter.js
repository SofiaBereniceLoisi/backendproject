import { Router } from 'express';
import { sendMailGMail } from '../controllers/emailController.js';
const router = Router();

router.post('/gmail', sendMailGMail);

export default router;