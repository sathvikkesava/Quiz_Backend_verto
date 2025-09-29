const express = require("express");
const mongoose = require("mongoose");
const quizRoutes = require("./routes/quiz");
const port = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/quiz").then(()=> console.log("connected to MongoDB"));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/quiz", quizRoutes);
app.listen(port,()=>console.log(`Server is running on port ${port}`));