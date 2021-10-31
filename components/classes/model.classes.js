import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const classes = new Schema({
  className: String,
  section: String
})

export default mongoose.model("classes", classes);