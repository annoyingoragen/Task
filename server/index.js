const express =require( "express");
const cors =require( "cors");
const userRoutes =require( "./routes/userRoute.js");

const openAIRoutes =require( "./routes/openAIRoute.js");
const dotenv =require( "dotenv");
const bodyParser =require( "body-parser");
const mongoose =require( "mongoose");
// const cookieParser =require( "cookie-parser");





const app=express();
dotenv.config();

app.use(bodyParser.json({limit:'50mb',extended:true}));

app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cookieParser());




const PORT=5000;
app.get('/',(req,res)=>{
  res.send('APP IS RUNNING');
})

app.use('/',userRoutes);
app.use('/',openAIRoutes);



mongoose.connect("mongodb+srv://dot:123@cluster0.p9nozz9.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology: true,
 
})
.then(()=>app.listen(PORT,()=>{console.log(`server running ${PORT}`)}))
.catch((error)=>console.log(`main error ${error.message}`));


