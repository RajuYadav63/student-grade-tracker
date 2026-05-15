const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://yadavraju76878_db_user:raju6367@cluster0.8mc0wnx.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.log(err));

const User = require("./models/user");

app.get("/", (req, res) => {
    res.send("Student Grade Tracker API Running");
});

app.post("/add", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.delete("/delete/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});