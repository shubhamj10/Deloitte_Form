const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Error: MONGO_URI not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Increase payload size limit to prevent 413 errors
app.use(express.json({ limit: "10mb" })); // Increase limit if needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/api/forms", formRoutes);
app.use("/auth", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
