import { Router } from 'express';
import * as orderController from '../controllers/order.controller.js';

const router = Router();

// Routes
router.post("/", orderController.create);
router.get("/", orderController.getAll); 

export default router;