import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  analysisData: any;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  analysisData: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);