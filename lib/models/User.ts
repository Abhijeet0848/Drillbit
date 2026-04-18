import mongoose, { Schema, model, models } from 'mongoose';
import crypto from 'crypto';

export interface IUser {
  name: string;
  email: string;
  institution: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  institution: { type: String, default: '' },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Utility to generate hashes
UserSchema.statics.hashPassword = function(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
};

if (models.User) {
  delete models.User;
}
const User = model<IUser>('User', UserSchema);

export default User;
