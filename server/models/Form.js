const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },  
  options: { type: [String], required: true },  
  weightage: { type: Number, required: true, min: 0 }  
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  questions: { type: [questionSchema], required: true }  
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
