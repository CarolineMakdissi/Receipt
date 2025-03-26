import express from "express";
import { handleTransaction } from "./Controllers/transactionController.js";
import { authMiddleware } from "./Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/transaction", authMiddleware, handleTransaction);
// router.post("/transaction-check", authMiddleware, handleTransactionCheck); // denna kommer in senare

export default router;