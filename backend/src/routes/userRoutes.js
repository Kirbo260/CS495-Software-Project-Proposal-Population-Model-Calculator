// src/routes/userRoutes.js
import express from 'express';
import { createUser } from '../controllers/userControllers.js';
import { loginUser, logoutUser } from '../controllers/LoginController.js';
import { authMiddleware } from '../middleWare/AuthMiddleWare.js';

const router = express.Router();

// POST /signup
router.post('/signup', createUser);

// GET /profile (protected route)
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

// POST /login
router.post('/login', loginUser);

// POST /logout
router.post('/logout', logoutUser);

export default router;