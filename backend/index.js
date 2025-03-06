require("dotenv").config();
const express =  require("express");
const mongoose = require("mongoose");
const cors =  require("cors");
const app= express();
const PORT = process.env.PORT || 7000;
const todoRoutes = require("./routes/todo.route")


app.use(express.json());
app.use(cors());

app.use("/api/v1" ,todoRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("MongoDB Connected Successfully")})
.catch((err)=>console.log("MongoDB Connection Error"));

app.listen(7000 ,  ()=>{
    console.log(`Server running at ${PORT}`)
})
