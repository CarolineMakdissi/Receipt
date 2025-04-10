// Helper function to convert undefined or null to null
const handleUndefinedToNull = (value) => {
  if (value === undefined || value === null) {
    return null;
  }
  return value;
};

import { saveTransaction } from "../Models/transactionModel.js";
import { saveCardInfo } from "../Models/cardInfoModel.js";
import { saveMembership } from "../Models/membershipModel.js";
import { db } from "../Database/db.js";

export const handleTransaction = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const transactionData = req.body;
    console.log("Received transaction request:", transactionData);

    const cardId = handleUndefinedToNull(transactionData?.xReceipts?.cardId);

    // Validate that cardId exists – otherwise return error
    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "cardId is required and cannot be null",
      });
    }

    // Validation of transactionAmount
    const transactionAmount =
      transactionData.transactionAmount?.merchantTransactionAmount;

    if (
      transactionAmount === 0 ||
      transactionAmount === undefined ||
      transactionAmount === null
    ) {
      return res.status(400).json({
        success: false,
        message: "merchantTransactionAmount must be a non-zero number",
      });
    }

    const paymentCard = transactionData.paymentCard || {};
    const maskedPan = handleUndefinedToNull(
      paymentCard?.maskedPan?.[0]?.maskedPanValue
    );
    const cardType = handleUndefinedToNull(paymentCard?.cardType);

    console.log("Extracted card info:");
    console.log(
      `cardId: ${cardId}, maskedPan: ${maskedPan}, cardType: ${cardType}`
    );

    // Run all saves in the database
    const results = await Promise.all([
      saveCardInfo(cardId, maskedPan, cardType, connection),
      ...(transactionData.xReceipts.cardholderMemberships?.map((m) =>
        saveMembership(m, cardId, connection)
      ) || []),
      saveTransaction(transactionData, cardId, connection),
    ]);

    await connection.commit();
    res.status(200).json({ success: true, message: "Transaction completed" });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process transaction",
      error: error.message,
    });
  } finally {
    if (connection) connection.release();
  }
};
