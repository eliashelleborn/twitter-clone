import mongoose from 'mongoose';

const { Schema } = mongoose;

const followSchema = new Schema({
  followee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  start: {
    type: Date,
    default: Date.now(),
  },
  end: Date,
});

export default mongoose.model('Follow', followSchema);
