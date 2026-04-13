// src/routes/userRoutes.js
import express from 'express';
import { createUser } from '../controllers/userControllers.js';
import { loginUser, logoutUser } from '../controllers/LoginController.js';
import { authMiddleware } from '../middleWare/AuthMiddleWare.js';
import uploadMiddle from '../middleWare/uploadMiddleWare.js';
import { createModel, getModels, getModelById, deleteModel, deleteAllModelsForUser } from '../controllers/modelController.js';
import { uploadCSV, getCSVFiles, getCSVFileById, deleteCSVFile, deleteAllCSVFilesForUser } from '../controllers/FileController.js';

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

// routes for saving and retrieving models will go here, protected by authMiddleware
router.post("/models", authMiddleware, createModel);

router.get("/my", authMiddleware, getModels);

router.get("/:id", authMiddleware, getModelById);

router.delete("/:id", authMiddleware, deleteModel);

router.delete("/my", authMiddleware, deleteAllModelsForUser);

// routes for uploading and managing CSV files, protected by authMiddleware
router.post("/upload", uploadMiddle.single("file"), uploadCSV);

router.get("/files", authMiddleware, getCSVFiles);

router.get("/files/:id", authMiddleware, getCSVFileById);

router.delete("/files/:id", authMiddleware, deleteCSVFile);

router.delete("/files/my", authMiddleware, deleteAllCSVFilesForUser);

export default router;