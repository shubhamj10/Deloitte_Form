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

app.use(express.json());
app.use(cors());
app.use("/api", formRoutes);
app.use("/auth", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
