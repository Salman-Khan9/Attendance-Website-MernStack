const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/TeacherRoute");
const env = require("dotenv").config();
const cookieparser = require("cookie-parser")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())

app.use(routes)

const Port = process.env.Port||4000  ;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(Port, () => {
    console.log(`server is running on Port ${Port} `);
  });
}).catch((err)=>{
    console.log(err)
});  