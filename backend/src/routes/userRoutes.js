// src/routes/userRoutes.js
import express from 'express';
import { createUser, forgotPassword, resetPassword } from '../controllers/userControllers.js';
import { loginUser, logoutUser } from '../controllers/LoginController.js';
import { authMiddleware } from '../middleWare/AuthMiddleWare.js';
import uploadMiddleWare from '../middleWare/uploadMiddleWare.js';
import { createModel, getModels, getModelById, updateModel, deleteModel, deleteAllModelsForUser, getDeletedModels, restoreModel } from '../controllers/modelController.js';
import { uploadCSV, getCSVFileById, deleteAllCSVFilesForUser } from '../controllers/FileController.js';
// import { uploadCSV, getCSVFiles, getCSVFileById, deleteCSVFile, deleteAllCSVFilesForUser } from '../controllers/FileController.js';
import { processCSV } from '../controllers/ProcessController.js';

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

router.put("/:id", authMiddleware, updateModel);

router.put("/models/:id/delete", authMiddleware, deleteModel);

router.delete("/my", authMiddleware, deleteAllModelsForUser);

router.get("/deleted", authMiddleware, getDeletedModels);

router.post("/restore/:id", authMiddleware, restoreModel);

// routes for uploading csv
router.post("/upload/process/:modelType", uploadMiddleWare(), processCSV);

// routes for uploading and storing csv files, protected by authMiddleware
router.post("/upload/store/:modelType", uploadMiddleWare(), uploadCSV);

// router.get("/files", authMiddleware, getCSVFiles);

router.get("/files/:id", authMiddleware, getCSVFileById);

// router.delete("/files/:id", authMiddleware, deleteCSVFile);

router.delete("/files/my", authMiddleware, deleteAllCSVFilesForUser);

// Forgot password routes 
router.post("/forgot", forgotPassword);

router.post("/reset/:token", resetPassword);

export default router;