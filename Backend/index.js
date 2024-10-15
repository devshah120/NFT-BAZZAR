import express from "express"
// const bodyParser = require('body-parser');
import bodyParser from "body-parser";
// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const dotenv = require('dotenv');
import dotenv from "dotenv"; 
import userrouter from './routes/user.js'  
import multer from "multer";
import connectDB from "./db/index.js";

dotenv.config({path: './config/.env',});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

connectDB()
.then(() => {
  app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
})

const storage = multer.diskStorage({
  destination: function(req,file, cb){
    return cb(null, './public/temp')
  },
  filename: function(req,file, cb){
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
});
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// const nftRoutes = require('./routes/nft');

app.use('/api/user', userrouter);

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
const upload = multer({storage})
app.post("/api/nft/upload",upload.single("Image"),(req,res) => {
  console.log(req.file);
  res.json({imageUrl: `/temp/${req.file.filename}`});
    
})