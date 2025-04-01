const mongoose = require("mongoose");
const Form = require('../models/Form');

mongoose.connect("mongodb+srv://prarajnaleext:shubhamj10@cluster0.uf9k3.mongodb.net/?retryWrites=true&w=majority");

async function updateQuestions() {
  const forms = await Form.find({});

  for (let form of forms) {
    let updated = false;

    let updatedQuestions = form.questions.map(q => {
      console.log(`Checking question:`, q.text);  // ✅ Log question text
      console.log(`Current _id:`, q._id);  // ✅ Log existing _id

      if (!q._id) {  // ✅ Debug if _id is missing
        console.log(`🚀 Adding _id to question: ${q.text}`);
        updated = true;
        return { _id: new mongoose.Types.ObjectId(), ...q };
      }

      return q;
    });

    if (updated) {
      form.questions = updatedQuestions;
      await form.save();
      console.log(`✅ Updated Form: ${form._id}`);
    } else {
      console.log(`⚠️ No update needed for Form: ${form._id}`);
    }
  }

  mongoose.connection.close();
  console.log("✅ All forms processed!");
}

updateQuestions();
