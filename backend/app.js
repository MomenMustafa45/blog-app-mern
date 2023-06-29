const express = require("express");
const app = express();
const cors = require("cors");

const path = require("path");

const authPath = require("./routes/auth");
const userPath = require("./routes/user");
const postsPath = require("./routes/post");
const commentPath = require("./routes/comment");
const categoryPath = require("./routes/category");

const connectToDb = require("./config/connectToDB");
const { errorHandler, notFound } = require("./middlewares/error");
require("dotenv").config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static("public"));
// connect to DB
connectToDb();

// static
// app.use(express.static("public"));

// built in middlewares
app.use(express.json());

// Cors Policy
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/api/users", userPath);
app.use("/api/auth", authPath);
app.use("/api/posts", postsPath);
app.use("/api/comment", commentPath);
app.use("/api/categories", categoryPath);

// Error Handler

app.use(notFound);
app.use(errorHandler);

// running the server on port 8000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
