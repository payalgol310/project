import { model , Schema } from 'mongoose';


const taskSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  text: { type: String },
  completed: { type: Boolean, default: false }
}, { timestamps: true });



export default model('task', taskSchema);



