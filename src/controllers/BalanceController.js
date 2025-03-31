const incomeModel = require("../models/IncomeModel");
const expenseModel = require("../models/ExpenseModel");

const getBalance = async (req,res) => {
    try {

        const sumofallincome = await incomeModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" } // Summing all "amount" fields
                }
            }
        ]);

        const sumofallexpense = await expenseModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" } // Summing all "amount" fields
                }
            }
        ]);

        const totalIncome = sumofallincome.length > 0 ? sumofallincome[0].total : 0;
        const totalExpense = sumofallexpense.length > 0 ? sumofallexpense[0].total : 0;
        
        const balance = totalIncome - totalExpense;

        res.status(200).json({
            message:"Total Balance....",
            balance:balance,
            totalIncome:totalIncome,
            totalExpense:totalExpense
        })
        
    } catch (err) {
        res.status(500).json({
            message:"Error....",
            data:err
        })
    }
}

module.exports = {
    getBalance
}