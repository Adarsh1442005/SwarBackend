import mongoose from "mongoose";

const audioSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    // enum: ['Classical', 'Folk', 'Fusion', 'Instrumental', 'Other'] // Optional: constrain genres
  },
  description: {
    type: String,
    maxlength: 1000
  },
  consent: {
    type: Boolean,
    required: true
  },
  audioPath: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});
export const audioschem =mongoose.model("audioswar",audioSubmissionSchema);