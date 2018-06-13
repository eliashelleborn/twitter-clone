import mongoose from 'mongoose';

const { Schema } = mongoose;

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  entities: {
    hashtags: Array,
    urls: Array,
    userMentions: Array,
  },

  stats: {
    favoriteCount: {
      type: Number,
      default: 0,
    },
    retweetCount: {
      type: Number,
      default: 0,
    },
    replyCount: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

export default mongoose.model('Tweet', tweetSchema);
