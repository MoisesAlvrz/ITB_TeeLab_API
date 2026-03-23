import { Router } from 'express';
import * as tshirtController from '../controllers/tshirt.controller.js'

const router = Router();

router.get("/", tshirtController.getAll);
router.get("/:id", tshirtController.getById);

export default router;