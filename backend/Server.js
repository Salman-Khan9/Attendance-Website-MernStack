const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/TeacherRoute");
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieparser = require("cookie-parser");
const route = require("./Routes/StudentRoutes");
const router = require("./Routes/AttendanceRoutes");
const app = express();
app.use(cors({
  origin:"https://attendify-website-mern-stack.vercel.app",
  credentials:true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Disposition'],
  preflightContinue: false,
  maxAge: 86400,
  credentials: true,
  headers: {
    'Access-Control-Allow-Credentials': 'true'
  } 

}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
app.use(bodyParser.json());

app.use(routes)
app.use(route)
app.use(router)

const Port = process.env.Port||4000  ;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(Port, () => {
    console.log(`server is running on Port ${Port} `);
  });
}).catch((err)=>{
    console.log(err)
});  
