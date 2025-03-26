import dotenv from "dotenv";
import { createTransactionsTable } from './src/Database/createTransactionTable.js';
dotenv.config({ path: "./.env" });

import express from "express";
import bodyParser from "body-parser";
import { handleTransaction } from "./src/Controllers/transactionController.js"; // Import controller
import { authMiddleware } from "./src/Middlewares/authMiddleware.js"; // Import middleware
import db from "./src/Database/db.js";

const app = express();

// Middleware
app.use(bodyParser.json()); // Allows us to receive JSON in POST requests

// Check if the database is connected
db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL");
    connection.release();
    createTransactionsTable(); // Create the table if it doesn't exist
  })
  .catch((err) => console.error("Error connecting to MySQL", err));

// Endpoint to save transactions och define an endpoint for POST request
app.post("/api/transaction", authMiddleware, handleTransaction);

// Endpoint for POST requests and match transactionsdata - detta kommer in senare
//app.post("/api/transaction-check", authMiddleware, handleTransactionCheck); // Sends to controller that handles the logic

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



