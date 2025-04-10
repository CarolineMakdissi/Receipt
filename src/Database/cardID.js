import db from "./Database/db.js"; // Import database

//Function to save ID card
export const saveCardId = async (cardId, maskedPan, cardType) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO card_ids (cardId, maskedPan, cardType) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE maskedPan = VALUES(maskedPan), cardType = VALUES(cardType)`,
      [cardId, maskedPan, cardType]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error saving card ID:", error);
    throw error;
  }
};
