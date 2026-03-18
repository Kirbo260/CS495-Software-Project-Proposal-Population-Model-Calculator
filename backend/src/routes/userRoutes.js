// src/routes/userRoutes.js
import express from 'express';
import { createUser } from '../controllers/userControllers.js';

const router = express.Router();

// POST /signup
router.post('/signup', createUser);

export default router;