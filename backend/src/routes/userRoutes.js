// src/routes/userRoutes.js
import express from 'express';
import { createUser, forgotPassword, resetPassword } from '../controllers/userControllers.js';
import { loginUser, logoutUser } from '../controllers/LoginController.js';
import { authMiddleware } from '../middleWare/AuthMiddleWare.js';
import uploadMiddleWare from '../middleWare/uploadMiddleWare.js';
import { createModel, getModels, getModelById, updateModel, deleteModel, deleteAllModelsForUser, getDeletedModels, restoreModel } from '../controllers/modelController.js';
import { uploadCSV, getCSVFileById, deleteAllCSVFilesForUser } from '../controllers/FileController.js';
// import { uploadCSV, getCSVFiles, getCSVFileById, deleteCSVFile, deleteAllCSVFilesForUser } from '../controllers/FileController.js';
import { emProcessCSV, conProcessCSV, disProcessCSV, logProcessCSV, predPreyProcessCSV } from '../controllers/ProcessController.js';

const router = express.Router();

// AUTH / PROFILE
router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

// MODELS (STATIC ROUTES FIRST)
router.get("/deleted", authMiddleware, getDeletedModels);

router.post("/models", authMiddleware, createModel);
router.get("/my", authMiddleware, getModels);
router.delete("/my", authMiddleware, deleteAllModelsForUser);

// MODEL ACTION ROUTES
router.post("/models/restore/:id", authMiddleware, restoreModel);

// IMPORTANT: more specific routes before generic ones
router.put("/models/:id/delete", authMiddleware, deleteModel);

// GENERIC ROUTE LAST (VERY IMPORTANT)
router.get("/:id", authMiddleware, getModelById);
router.put("/:id", authMiddleware, updateModel);

// FILE ROUTES
router.post("/upload/process/emcomparsion/:validType", uploadMiddleWare(), emProcessCSV); // comparing models
router.post("/upload/process/continuous/:validType", uploadMiddleWare(), conProcessCSV); // continuous
router.post("/upload/process/discrete/:validType", uploadMiddleWare(), disProcessCSV); // discrete
router.post("/upload/process/logistic/:validType", uploadMiddleWare(), logProcessCSV); // logistic
router.post("/upload/process/predator-prey/:validType", uploadMiddleWare(), predPreyProcessCSV); // pred-prey
router.post("/upload/store/:validType", authMiddleware, uploadMiddleWare(), uploadCSV); //storing csv

router.get("/files/:id", authMiddleware, getCSVFileById);
router.delete("/files/my", authMiddleware, deleteAllCSVFilesForUser);

// PASSWORD ROUTES
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

export default router;