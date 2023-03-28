require("dotenv").config();
const express = require("express");
const app = express();
const { router } = require("./routers/route");
app.use(express.json());
app.use(router);
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Listening to ${process.env.PORT}`)
})