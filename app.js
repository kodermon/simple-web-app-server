require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// routers
const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profileRoutes");

// middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://illustrious-conkies-12dcd1.netlify.app",
      "https://simple-web-app.onrender.com",
    ],
    credentials: true,
  })
);

// app.options("*", corsMw);
// app.use(corsMw);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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
