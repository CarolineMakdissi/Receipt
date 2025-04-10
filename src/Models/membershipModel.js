import { db } from "../Database/db.js";

export const saveMembership = async (membership, cardId, connection = db) => {
  try {
    console.log("Saving Membership:", membership);

    const [result] = await connection.execute(
      `INSERT INTO memberships (
        memberValue, 
        memberValueType, 
        memberValueProvider, 
        cardId
      ) VALUES (?, ?, ?, ?)`,
      [
        membership.memberValue,
        membership.memberValueType,
        membership.memberValueProvider,
        cardId,
      ]
    );
    return result;
  } catch (error) {
    console.error("Error saving membership:", error);
    throw error;
  }
};
