import { db } from '../Database/db.js';

export const saveTransaction = async (transactionData, cardId, connection = db) => {
  try {
    console.log("Saving Transaction Data:", transactionData);

    // Extract all fields with null handling
    const retrievalReferenceNumber = 
      transactionData.transactionIdentifier?.retrievalReferenceNumber ?? null;
    const acquirerTerminalId = transactionData.acquirerTerminalId ?? null;
    const acquirerMerchantId = 
      transactionData.paymentCard.acquirerMerchantIds?.acquirerMerchantId ?? null;
    const cardType = transactionData.paymentCard.cardType ?? null;
    const acquirerTransactionTimestamp = 
      transactionData.acquirerTransactionTimestamp ?? null;
    const transactionAmount = 
      transactionData.transactionAmount.merchantTransactionAmount ?? null;
    const transactionCurrency = 
      transactionData.transactionAmount.merchantTransactionCurrency ?? null;
    const authorizationCode = 
      transactionData.transactionIdentifier?.authorizationCode ?? null;
    const systemTraceAuditNumber = 
      transactionData.transactionIdentifier?.systemTraceAuditNumber ?? null;
    const maskedPan = 
      transactionData.paymentCard.maskedPan[0]?.maskedPanValue ?? null;
    const merchantName = transactionData.merchantName ?? null;

    const [result] = await connection.execute(
      `INSERT INTO transactions (
        card_id,  // Added cardId to the query
        retrieval_reference_number,
        acquirer_terminal_id,
        acquirer_merchant_id,
        card_type,
        acquirer_transaction_timestamp,
        transaction_amount,
        transaction_currency,
        authorization_code,
        system_trace_audit_number,
        masked_pan,
        merchant_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,  // Added extra ? for card_id
      [
        cardId,  // Added cardId value
        retrievalReferenceNumber,
        acquirerTerminalId,
        acquirerMerchantId,
        cardType,
        acquirerTransactionTimestamp,
        transactionAmount,
        transactionCurrency,
        authorizationCode,
        systemTraceAuditNumber,
        maskedPan,
        merchantName
      ]
    );
    console.log("Transaction saved with ID:", result.insertId);
    return result.insertId;
  } catch (error) {
    console.error("Error saving transaction to database:", error);
    throw error;
  }
};