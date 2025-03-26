import { saveTransaction } from '../Models/transactionModel.js';  // Import saveTransaction from your model

export const handleTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    console.log('Received a request to /api/transaction');
    console.log('Transaction Data:', transactionData);
    
    console.log('Saving transaction...');
    await saveTransaction(transactionData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Transaction saved successfully' 
    });
  } catch (error) {
    console.error('Error in transaction handler:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process transaction',
      error: error.message 
    });
  }
};