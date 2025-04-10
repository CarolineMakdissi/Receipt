import { db } from '../Database/db.js';  

export const saveCardInfo = async (
  cardId,
  maskedPan,
  cardType,
  connection = db
) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO card_info (card_id, masked_pan, card_type) VALUES (?, ?, ?)`,
      [cardId, maskedPan, cardType]
    );
    return result;
  } catch (error) {
    console.error("Error saving card info:", error);
    throw error; 
  }
};
