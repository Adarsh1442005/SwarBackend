import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { memberschem } from './member.js';
import { audioschem } from './audio.js';
import { upload } from './audiofile.js';
import { transporter } from './email.js';
import bcrypt from 'bcryptjs';
const app = express();
const PORT = process.env.PORT || 5000;
const admincode="swar60077";

// Replace this with your actual MongoDB URI
const mongoURI = 'mongodb+srv://aadi:Adarsh1442005@cluster0.nc0yl.mongodb.net/Swar?retryWrites=true&w=majority&appName=Cluster0'
// Or for Atlas:
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/swar-music?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use('/audio', express.static('uploads/audio'));

const otpStore = new Map();
let sendmem=new Map();
const member=async (req,res)=>{
const{name,email,message,contact,year,Branch,instrument}=req.body;
  console.log("data received from membership");
const data={name,email,message,instrument,contact,year,Branch};
const checkmember=await memberschem.findOne({email});
if(checkmember){
  res.json({code:0});
  return;
}
else{
    sendmem.set(email,data);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
       otpStore.set(email,{otp});
    
    
  const otpsend={from:"ap4866017@gmail.com",
        to:email,
        subject:"Email verification from Swar ",
        text: `Your verification code is: ${otp}. It will expire in 10 minutes.`
  }
  try{
  await transporter.sendMail(otpsend);
    console.log("otp send successfully");
  res.json({code:1,text:"verification code send successfully to your email"});
  
  }
  catch(error){
    console.log(" there is error in creating the acoount");
    res.json({text:"error in crearing account"});

  }


}
} 

app.post('/membership', member);

const verifing=async (req,res)=>{
   app.use(cors());
   const {code,email}=req.body;
  const store=otpStore.get(email);
   if(!store){
    
    res.json({code : -1,text:"entered otp is wrong please enter the correct otp or try again"});
    return;
   

   }
   else if(store.otp===code){
      const sendmember=new memberschem(sendmem.get(email));
    await sendmember.save();
    res.json({code :1 ,text:"your emailhas been verified successfully and your response has been recorded "});
    sendmem.delete(email); 
     otpStore.delete(email);
    return;
   }
  else{
    res.json({code:-1, text:"you have entered wrong OTP please try again.."});
    
  }
  
    
   


}
app.post('/verify',verifing);
const messages=async (req,res)=>{
  try{
      const member=await memberschem.find();
      res.json(member);
  }
  catch(error){
    console.log("error in fetching the data");
    

  }





}

app.get("/message",messages);
const adm=(req,res)=>{
  const{password}=req.body;
  if(password===admincode){
    res.json({code:1});
  }
  else{
    res.json({code:0});
  }

}
app.post("/admin",adm);
const adminb=(req,res)=>{
 if(req.body.password===admincode){
  res.json({code:1});
 }
 else{
  res.json({code:0});
 }



}
app.post("/audioadmin",adminb);



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
