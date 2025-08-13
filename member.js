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
  Branch:{
    type:String,
    required:true,
    trim: true
  },
  contact:{
    type:String,
    required:true,
    trim: true
  },
  year:{
    type:String,
    required:true,
    trim:true
  },
  instrument: {
    type: String,
    required: true,
    enum: ['Guitar', 'Piano', 'Violin', 'Vocals', 'Tabla', 'Other'], // customize as needed
  },
 
}, { timestamps: true });

export const memberschem=mongoose.model('Member', memberSchema);

