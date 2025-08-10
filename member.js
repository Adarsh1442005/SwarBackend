import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  message: {
    type: String,
    default: '',
    trim: true,
  },
  instrument: {
    type: String,
    required: true,
    enum: ['Guitar', 'Piano', 'Violin', 'Vocals', 'Tabla', 'Other'], // customize as needed
  },
  avatar: {
    type: String, // file path or URL
    default: '',
  },
}, { timestamps: true });

export const memberschem=mongoose.model('Member', memberSchema);

