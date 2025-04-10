import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import bodyParser from "body-parser";
import { createTables } from "./src/Database/createTables.js"; 
import { handleTransaction } from "./src/Controllers/transactionController.js"; 
import { authMiddleware } from "./src/Middlewares/authMiddleware.js"; 
import { db } from "./src/Database/db.js";

const app = express();

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// Connect to MySQL and check the connection
db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL");
    connection.release(); // Don't forget to release the connection after use
    createTables(); // Create all tables if they don't exist
  })
  .catch((err) => {
    console.error("Error connecting to MySQL", err);
    process.exit(1); // Stop the app if the DB connection fails
  });

// Endpoint to receive and store transactions
app.post("/api/transaction", authMiddleware, handleTransaction);

// Future endpoint to check transactions and reply with ok (to be implemented later)
// app.post("/api/transaction-check", authMiddleware, handleTransactionCheck);

// Start the Express server on the specified port and bind to all interfaces
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
