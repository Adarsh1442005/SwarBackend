import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audio'); // Folder to save audio files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Optional: Filter only audio files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!['.mp3', '.wav', '.m4a'].includes(ext)) {
    return cb(new Error('Only audio files are allowed'), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });