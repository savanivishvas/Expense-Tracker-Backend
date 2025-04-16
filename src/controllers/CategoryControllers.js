const categoryModel = require("../models/CategoryModel");
const incomeModel = require("../models/IncomeModel");
const expenseModel = require("../models/ExpenseModel");

// Add category API
const addCategory = async (req, res) => {
    try {
        const createCategory = await categoryModel.create(req.body);
        res.status(200).json({
            message: "Category added successfully.",
            data: createCategory
        });
    } catch (err) {
        res.status(500).json({
            message: "Error adding category.",
            error: err.message
        });
    }
};

// Get all income categories
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await incomeModel.distinct("category");
        res.status(200).json({
            message: "Income categories fetched successfully.",
            data: allCategories
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching income categories.",
            error: err.message
        });
    }
};

// Get income by category
const getIncomeByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const incomes = await incomeModel.find({ category });
        res.status(200).json({
            message: `All income entries for category: ${category}`,
            data: incomes
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching income by category.",
            error: err.message
        });
    }
};

// Get expense by category
const getExpenseByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const expenses = await expenseModel.find({ category });
        res.status(200).json({
            message: `All expense entries for category: ${category}`,
            data: expenses
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching expense by category.",
            error: err.message
        });
    }
};

// Get all expense categories
const getAllExpenseCategories = async (req, res) => {
    try {
        const allCategories = await expenseModel.distinct("category");
        res.status(200).json({
            message: "Expense categories fetched successfully.",
            data: allCategories
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching expense categories.",
            error: err.message
        });
    }
};

const getAllExpenseCategoriesWithSum = async (req, res) => {
    try {
      const categoriesWithSum = await expenseModel.aggregate([
        {
          $group: {
            _id: "$category", // group by category
            totalAmount: { $sum: "$amount" }, // sum of amounts per category
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalAmount: 1,
          },
        },
        {
          $sort: { category: 1 }, // optional: sort alphabetically
        }
      ]);

      const topfiveexpense = await expenseModel.aggregate([
        {
          $group: {
            _id: "$category", // group by category
            totalAmount: { $sum: "$amount" }, // sum of amounts per category
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalAmount: 1,
          },
        },
        {
          $sort: { totalAmount: -1 }, // optional: sort alphabetically
        },
        {
            $limit : 5
        }
      ]);
  
      res.status(200).json({
        message: "Income categories with total amounts fetched successfully.",
        data: categoriesWithSum,
        topexpense:topfiveexpense
      });
    } catch (err) {
      res.status(500).json({
        message: "Error fetching income categories with total amounts.",
        error: err.message,
      });
    }
  };
  

const getAllIncomeCategoriesWithSum = async (req, res) => {
    try {
      const categoriesWithSum = await incomeModel.aggregate([
        {
          $group: {
            _id: "$category", // group by category
            totalAmount: { $sum: "$amount" }, // sum of amounts per category
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalAmount: 1,
          },
        },
        {
          $sort: { category: 1 }, // optional: sort alphabetically
        }
      ]);

      const topfiveincome = await incomeModel.aggregate([
        {
          $group: {
            _id: "$category", // group by category
            totalAmount: { $sum: "$amount" }, // sum of amounts per category
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalAmount: 1,
          },
        },
        {
          $sort: { totalAmount: -1 }, // optional: sort alphabetically
        },
        {
            $limit : 5
        }
      ]);
  
      res.status(200).json({
        message: "Income categories with total amounts fetched successfully.",
        data: categoriesWithSum,
        topincome:topfiveincome,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error fetching income categories with total amounts.",
        error: err.message,
      });
    }
  };
  


module.exports = {
    addCategory,
    getAllCategories,
    getIncomeByCategory,
    getExpenseByCategory,
    getAllExpenseCategories,
    getAllIncomeCategoriesWithSum,
    getAllExpenseCategoriesWithSum
};
