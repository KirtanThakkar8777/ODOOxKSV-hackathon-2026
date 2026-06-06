import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action:   String,
  entity:   String,
  entityId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

export default mongoose.model('ActivityLog', logSchema);