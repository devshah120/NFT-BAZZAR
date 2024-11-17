import bodyParser from "body-parser";
import dotenv from "dotenv"; 
import userrouter from './routes/user.js'  
import multer from "multer";
import connectDB from "./db/index.js";
import {app, server} from "./socket/index.js"
dotenv.config({path: './config/.env',});

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

connectDB()
.then(() => {
  server.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
  })
})

const storage = multer.diskStorage({
  destination: function(req,file, cb){
    return cb(null, './public/temp')
  },
  filename: function(req,file, cb){
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
});

app.use('/api/user', userrouter);


const upload = multer({storage})
app.post("/api/nft/upload",upload.single("Image"),(req,res) => {
  console.log(req.file);
  res.json({imageUrl: `/temp/${req.file.filename}`});
    
})