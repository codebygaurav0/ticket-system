const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/tickets", ticketRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});