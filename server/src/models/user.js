import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  username: {
    type: String,
    required: true,
    maxlength: 20,
  },
  screenName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
    select: false,
  },

  profileBanner: String,
  profileImage: String,
  description: String,
  location: String,

  verified: {
    type: Boolean,
    default: false,
  },
  private: {
    type: Boolean,
    default: false,
  },

  stats: {
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    tweetsCount: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  async comparePasswords(password) {
    return bcrypt.compare(password, this.password);
  },
  transform() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  },
});

export default mongoose.model('User', userSchema);
