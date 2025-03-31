const incomeModel = require("../models/IncomeModel");
const expenseModel = require("../models/ExpenseModel");

const DayWiseReport = async (req, res) => {
    try {
        // Get today's date
        const today = new Date();

        // Calculate Monday (Start of the Week)
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        // firstDayOfWeek.setHours(0, 0, 0, 0);

        // Calculate Sunday (End of the Week)
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        // lastDayOfWeek.setHours(23, 59, 59, 999);

        // Fetch income and expenses for the current week
        const incomes = await incomeModel.find({
            transactionDate: { $gte: firstDayOfWeek, $lte: lastDayOfWeek }
        });

        const expenses = await expenseModel.find({
            transactionDate: { $gte: firstDayOfWeek, $lte: lastDayOfWeek }
        });

        // Initialize report object
        const report = {
            Monday: { income: 0, expense: 0 },
            Tuesday: { income: 0, expense: 0 },
            Wednesday: { income: 0, expense: 0 },
            Thursday: { income: 0, expense: 0 },
            Friday: { income: 0, expense: 0 },
            Saturday: { income: 0, expense: 0 },
            Sunday: { income: 0, expense: 0 },
        };

        // Function to get the day name
        const getDayName = (date) => new Date(date).toLocaleString("en-US", { weekday: "long" });

        // Process incomes
        incomes.forEach((income) => {
            const dayName = getDayName(income.transactionDate);
            if (report[dayName]) {
                report[dayName].income += income.amount;
            }
        });

        // Process expenses
        expenses.forEach((expense) => {
            const dayName = getDayName(expense.transactionDate);
            if (report[dayName]) {
                report[dayName].expense += expense.amount;
            }
        });

        // Send response
        res.status(200).json({
            message: "Day-wise report fetched successfully",
            data: report,
            firstDate: firstDayOfWeek.toISOString().split("T")[0],
            lastDate: lastDayOfWeek.toISOString().split("T")[0],
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching report",
            error: err.message
        });
    }
};

const WeekWiseReport = async (req, res) => {
    try {
        // Number of weeks to fetch (e.g., last 4 weeks)
        const weeksCount = 4;

        // Get today's date
        const today = new Date();

        // Get the Monday of the current week
        let currentMonday = new Date(today);
        currentMonday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        currentMonday.setHours(0, 0, 0, 0);

        // Calculate start date for the report (4 weeks ago Monday)
        const startDate = new Date(currentMonday);
        startDate.setDate(currentMonday.getDate() - (weeksCount - 1) * 7);

        // Fetch income and expenses within the range
        const incomes = await incomeModel.find({
            transactionDate: { $gte: startDate, $lte: currentMonday }
        });

        const expenses = await expenseModel.find({
            transactionDate: { $gte: startDate, $lte: currentMonday }
        });

        // Initialize week-wise report object
        let report = {
            Week1: { income: 0, expense: 0 },
            Week2: { income: 0, expense: 0 },
            Week3: { income: 0, expense: 0 },
            Week4: { income: 0, expense: 0 },
        };

        // Loop through each week and store the week start date
        let weekBoundaries = [];
        for (let i = 0; i < weeksCount; i++) {
            let weekStart = new Date(startDate);
            weekStart.setDate(startDate.getDate() + i * 7);
            weekBoundaries.push(weekStart);
        }

        // Helper function to determine the week for a transaction
        const findWeekIndex = (transactionDate) => {
            let date = new Date(transactionDate);
            for (let i = 0; i < weeksCount; i++) {
                let weekStart = weekBoundaries[i];
                let weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);

                if (date >= weekStart && date <= weekEnd) {
                    return `Week${i + 1}`;
                }
            }
            return null;
        };

        // Process incomes
        incomes.forEach((income) => {
            let weekKey = findWeekIndex(income.transactionDate);
            if (weekKey) {
                report[weekKey].income += income.amount;
            }
        });

        // Process expenses
        expenses.forEach((expense) => {
            let weekKey = findWeekIndex(expense.transactionDate);
            if (weekKey) {
                report[weekKey].expense += expense.amount;
            }
        });

        // Send response
        res.status(200).json({
            message: "Week-wise report fetched successfully",
            data: report
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching report",
            error: err.message
        });
    }
};

const MonthWiseReport = async (req, res) => {
    try {
        // Get today's date
        const today = new Date();

        // Fetch income and expenses for the current year
        const startDate = new Date(today.getFullYear(), 0, 1); // January 1st
        const endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999); // December 31st

        const incomes = await incomeModel.find({
            transactionDate: { $gte: startDate, $lte: endDate }
        });

        const expenses = await expenseModel.find({
            transactionDate: { $gte: startDate, $lte: endDate }
        });

        // Initialize the report for all months in a year
        let report = {
            January: { income: 0, expense: 0 },
            February: { income: 0, expense: 0 },
            March: { income: 0, expense: 0 },
            April: { income: 0, expense: 0 },
            May: { income: 0, expense: 0 },
            Jun: { income: 0, expense: 0 },
            July: { income: 0, expense: 0 },
            August: { income: 0, expense: 0 },
            September: { income: 0, expense: 0 },
            October: { income: 0, expense: 0 },
            November: { income: 0, expense: 0 },
            December: { income: 0, expense: 0 },
        };

        // Helper function to get the month name from a date
        const getMonthName = (date) => {
            return new Date(date).toLocaleString("en-US", { month: "long" });
        };

        // Process incomes
        incomes.forEach((income) => {
            let month = getMonthName(income.transactionDate);
            if (report[month]) {
                report[month].income += income.amount;
            }
        });

        // Process expenses
        expenses.forEach((expense) => {
            let month = getMonthName(expense.transactionDate);
            if (report[month]) {
                report[month].expense += expense.amount;
            }
        });

        // Send response
        res.status(200).json({
            message: "Month-wise report fetched successfully",
            data: report
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching report",
            error: err.message
        });
    }
};

const YearWiseReport = async (req, res) => {
    try {
        // Number of years to fetch (e.g., last 4 years)
        const yearsCount = 4;

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Calculate the start year (e.g., 4 years ago)
        const startYear = currentYear - (yearsCount - 1);

        // Fetch income and expenses within the range
        const incomes = await incomeModel.find({
            transactionDate: {
                $gte: new Date(startYear, 0, 1),
                $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)
            }
        });

        const expenses = await expenseModel.find({
            transactionDate: {
                $gte: new Date(startYear, 0, 1),
                $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)
            }
        });

        // Initialize year-wise report object
        let report = {
            "2021": { income: 0, expense: 0 },
            "2022": { income: 0, expense: 0 },
            "2023": { income: 0, expense: 0 },
            "2024": { income: 0, expense: 0 }
        };

        // Process incomes
        incomes.forEach((income) => {
            let year = new Date(income.transactionDate).getFullYear();
            if (report[year]) {
                report[year].income += income.amount;
            }
        });

        // Process expenses
        expenses.forEach((expense) => {
            let year = new Date(expense.transactionDate).getFullYear();
            if (report[year]) {
                report[year].expense += expense.amount;
            }
        });

        // Send response
        res.status(200).json({
            message: "Year-wise report fetched successfully",
            data: report
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching report",
            error: err.message
        });
    }
};

module.exports = {
    DayWiseReport,
    WeekWiseReport,
    MonthWiseReport,
    YearWiseReport
};
