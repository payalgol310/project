import { model , Schema } from 'mongoose';


const userSchema = new Schema({
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });



export default model('user', userSchema);



