const IncomeModel = require("../models/IncomeModel");
const ExpenseModel = require("../models/ExpenseModel");

const getRecentTransactions = async (req,res) => {
  
  try {

      // Fetch last 5 income transactions sorted by date (most recent first)
      const recentIncome = await IncomeModel.find().sort({ transactionDate: -1 }).limit(5);
  
      // Fetch last 5 expense transactions sorted by date (most recent first)
      const recentExpenses = await ExpenseModel.find().sort({ transactionDate: -1 }).limit(5);
  
      // Combine and sort both lists by transaction date (descending order)
      const recentTransactions = [...recentIncome, ...recentExpenses].sort((a, b) => 
        new Date(b.transactionDate) - new Date(a.transactionDate)
      );
      
      res.status(200).json({ 
        message: "All Recent Transactions ....", 
        data: recentTransactions 
      });
  } 
  catch (err) {
    res.status(500).json({ 
      message: "Error fetching recent transactions",  
      data: err, 
    });
  }
}

module.exports = {
  getRecentTransactions
}
