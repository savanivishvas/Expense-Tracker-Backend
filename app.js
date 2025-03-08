const express = require("express");  // express ....
const mongoose = require("mongoose"); // database ....
const cors = require("cors");

// express object
const app = express();

// connect cors
const corsOptions = {
    origin:"http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json()); // accept json data ....

// role routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use("/role",roleRoutes);

// user routes
const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

// admin routes
const adminRoutes = require("./src/routes/AdminRoutes");
app.use(adminRoutes);

// category routes
const categoryRoutes = require("./src/routes/CategoryRoutes");
app.use("/category",categoryRoutes);

// subcategory routes
const subcategoryRoutes = require("./src/routes/SubcategoryRoutes");
app.use("/subcategory",subcategoryRoutes);

// account routes
const accountRoutes = require("./src/routes/AccountRoutes");
app.use("/account",accountRoutes);

// database connectivity
mongoose.connect("mongodb://127.0.0.1:27017/expense_tracker").then(() => {
    console.log("Database connected ....");
})

// server creation
const PORT = 5000;
app.listen(PORT,(req,res) => {
    console.log("server start on port number ", PORT);
})

