import mongoose, { Schema, model, models } from 'mongoose';

export interface ISource {
  url: string;
  percentage: number;
}

export interface IReport {
  userId: string;
  filename: string;
  submissionType: string;
  language: string;
  similarityIndex: number;
  aiScore: number;
  status: 'Completed' | 'Flagged' | 'Scanning' | 'Rejected';
  content: string;
  topSources: ISource[];
  createdAt: Date;
}

const SourceSchema = new Schema<ISource>({
  url: { type: String, required: true },
  percentage: { type: Number, required: true }
});

const ReportSchema = new Schema<IReport>({
  userId: { type: String, required: false }, // false to avoid breaking legacy reports
  filename: { type: String, required: true },
  submissionType: { type: String, required: true },
  language: { type: String, required: true },
  similarityIndex: { type: Number, required: true },
  aiScore: { type: Number, required: true },
  status: { type: String, enum: ['Completed', 'Flagged', 'Scanning', 'Rejected'], default: 'Completed' },
  content: { type: String, default: '' },
  topSources: { type: [SourceSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

if (models.Report) {
  delete models.Report;
}
const Report = model<IReport>('Report', ReportSchema);

export default Report;
