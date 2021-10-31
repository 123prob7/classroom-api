import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const user = new Schema({
  username: String,
  password: String
})

export default mongoose.model("users", user);