const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://yadavraju76878_db_user:raju6367@cluster0.8mc0wnx.mongodb.net/studentDB?appName=Cluster0&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.log(err));

const User = require("./models/User");


// CREATE
app.post("/add", async (req, res) => {

    const user = new User(req.body);

    await user.save();

    res.json(user);
});


// READ
app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);
});


// DELETE
app.delete("/delete/:id", async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.json({
        message: "Deleted"
    });
});


// UPDATE
app.put("/update/:id", async (req, res) => {

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedUser);
});


app.listen(5000, () => {
    console.log("Server Running");
});