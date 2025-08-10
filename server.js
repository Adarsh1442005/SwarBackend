import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { memberschem } from './member.js';
import { audioschem } from './audio.js';
import { upload } from './audiofile.js';
const app = express();
const PORT = process.env.PORT || 5000;

// Replace this with your actual MongoDB URI
const mongoURI = 'mongodb+srv://aadi:Adarsh1442005@cluster0.nc0yl.mongodb.net/Swar?retryWrites=true&w=majority&appName=Cluster0'
// Or for Atlas:
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/swar-music?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use('/audio', express.static('uploads/audio'));


const member=async (req,res)=>{
const{name,email,message,instrument,avatar}=req.body;
const data={name,email,message,instrument,avatar};
const sendmember=new memberschem(data);
await sendmember.save();

res.send("data received");
console.log(req.body);



} 

app.post('/membership', member);


const audio=async(req,res)=>{
    const{name,email,title,genre,description,consent}=req.body;
    const audioPath=req.file.path;
    const finalsubmit={name,email,title,genre,description,consent,audioPath};
    const submit=new audioschem(finalsubmit);
    await submit.save();
    res.send("audiosubmittedsubmitted");
    console.log(req.body);





}

app.post('/upload-audio', upload.single('audio'),audio);






async function startServer() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}


startServer();
console.log("server started");