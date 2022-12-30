require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// routers
const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRoutes");

// middleware
app.use(express.json());

// routes
app.use("/api/auth", userRouter);
app.use("/api/user/profile", profileRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
