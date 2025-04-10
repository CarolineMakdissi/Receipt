import { db } from "./db.js";

export const createTables = async () => {
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
        maskedPan VARCHAR(255) NOT NULL,
        merchantName VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_retrievalReferenceNumber (retrievalReferenceNumber)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS card_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cardId VARCHAR(255) NOT NULL,
        maskedPan VARCHAR(255) NOT NULL,
        cardType VARCHAR(50) NOT NULL,
        UNIQUE(cardId)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS memberships (
        id INT AUTO_INCREMENT PRIMARY KEY,
        memberValue VARCHAR(255) NOT NULL,
        memberValueType VARCHAR(50) NOT NULL,
        memberValueProvider VARCHAR(255) NOT NULL,
        cardId VARCHAR(255) NOT NULL,
        FOREIGN KEY (cardId) REFERENCES card_info(cardId)
      )
    `);

    console.log("Tables created or verified successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
