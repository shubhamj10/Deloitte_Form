const express = require("express");
const Form = require("../models/Form");
const Response = require("../models/Response");
const { authenticateToken } = require("../utils/auth");
const User = require("../models/User");

const router = express.Router();

// Fetch all forms
router.get("/all", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch forms." });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const forms = await Form.find({}, "title");
    res.json(forms.map(form => form.title)); // Send only category titles
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories." });
  }
});

// Fetch questions for a selected category
router.post("/submit", authenticateToken, async (req, res) => {
  console.log("Incoming submission:", req.body); // ✅ Debugging

  const { formId, responses } = req.body; 
  const userId = req.user.id;

  if (!formId || !responses?.length) {
    console.error("Invalid submission data:", req.body);
    return res.status(400).json({ message: "Invalid submission data." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: "Form not found." });

    // Extract category name from the form
    const categoryName = form.title;

    // Map responses correctly
    const ratings = responses.map(({ questionId, answer }) => {
      const question = form.questions.find(q => q._id.toString() === questionId);
      return {
        question: question ? question.text : "Unknown Question",
        ratings: Number(answer) || 0,
      };
    });

    // Create and save the response
    const newResponse = new Response({
      categoryName,
      ratings,
      user: userId,
    });

    await newResponse.save();

    res.status(200).json({ message: "Survey submitted successfully!" });
  } catch (error) {
    console.error("Failed to submit survey:", error);
    res.status(500).json({ message: "Failed to submit survey." });
  }
});


// Fetch questions for a selected category (Keep this below /submit)
router.get("/:category", async (req, res) => {
  try {
    const form = await Form.findOne({ title: req.params.category });
    if (!form) return res.status(404).json({ message: "Form not found for this category." });

    if (!form.questions || form.questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this category." });
    }

    res.json({ formId: form._id, questions: form.questions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});


module.exports = router;
