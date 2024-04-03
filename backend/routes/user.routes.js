import express from 'express';
import { getUserForSideBar } from '../controllers/user.controller.js';
import portectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();

router.get('/',portectRoutes,getUserForSideBar)

export default router;