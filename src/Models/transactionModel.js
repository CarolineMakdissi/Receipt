import db from '../Database/db.js'; // Import database connection

// Function to save a transaction into the database
export const saveTransaction = async (transactionData) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO transactions (
        retrievalReferenceNumber, 
        acquirerTerminalId, 
        acquirerMerchantId, 
        cardType, 
        acquirerTransactionTimestamp, 
        transactionAmount, 
        transactionCurrency, 
        authorizationCode, 
        systemTraceAuditNumber, 
        maskedPen, 
        merchantName
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        transactionData.retrievalReferenceNumber,
        transactionData.acquirerTerminalId,
        transactionData.acquirerMerchantId,
        transactionData.cardType,
        transactionData.acquirerTransactionTimestamp,
        transactionData.transactionAmount,
        transactionData.transactionCurrency,
        transactionData.authorizationCode,
        transactionData.systemTraceAuditNumber,
        transactionData.maskedPen,
        transactionData.merchantName,
      ]
    );

    console.log("Transaction saved to database with ID:", result.insertId);
    return result.insertId;
  } catch (error) {
    console.error("Error saving transaction to database:", error);
    throw error;
  }
};

// Function to retrieve a transaction based on retrievalReferenceNumber
export const getTransaction = async (retrievalReferenceNumber) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM transactions WHERE retrievalReferenceNumber = ?",
      [retrievalReferenceNumber]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error getting transaction from database:", error);
    throw error;
  }
};