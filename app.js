const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://sumerkumar641:sumer$10@cluster0.hxerfhn.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, // Add this line to avoid deprecation warning
  }
);

// Check if the connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});
app.use(express.static(path.join(__dirname, "frontend")));
// Routes
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use("/auth", authRoutes);
app.use("/news", newsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
