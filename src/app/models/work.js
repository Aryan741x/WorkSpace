const mongoose = require('mongoose');
const WorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  taskto: { type: String },
  isChecked: { type: Boolean, default: false },
  duration:{ type: String },
  createdAt: { type: Date, default: Date.now,immutable:true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Work || mongoose.model('Work', WorkSchema);
 