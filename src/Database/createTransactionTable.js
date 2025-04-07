import db from './db.js';

export const createTransactionsTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        retrievalReferenceNumber VARCHAR(255) NOT NULL,
        acquirerTerminalId VARCHAR(255) NOT NULL,
        acquirerMerchantId VARCHAR(255) NOT NULL,
        cardType VARCHAR(50) NOT NULL,
        acquirerTransactionTimestamp VARCHAR(255) NOT NULL,
        transactionAmount DECIMAL(10, 2) NOT NULL,
        transactionCurrency VARCHAR(10) NOT NULL,
        authorizationCode VARCHAR(255) NOT NULL,
        systemTraceAuditNumber VARCHAR(255) NOT NULL,
        maskedPen VARCHAR(255) NOT NULL,
        merchantName VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_retrievalReferenceNumber (retrievalReferenceNumber)
      )
    `);
    console.log('Transactions table created successfully');
  } catch (error) {
    console.error('Error creating transactions table:', error);
  }
};
