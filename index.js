const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const Chat = require('./models/chat.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

// let chat1 = new Chat({
//     from: "neha",
//     to: "asha",
//     msg: "this is cheat sheet for cn",
//     created_at: new Date(),
// });

// chat1.save()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//DELETE ROUTE
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let updatedChat = await Chat.findOneAndDelete(id, { new: true });
    console.log("DELETED HERE----",updatedChat);
    res.redirect("/Chats");
});


//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
    console.log(updatedChat);
    res.redirect("/Chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    console.log("----edit---- id: ", id);

    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});


//create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    // console.log(form,to ,msg);
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    // console.log(newChat);
    newChat
        .save()
        .then((result) => {
            console.log("chat was saved");
        })
        .catch((err) => {
            console.log("----Your err here-----", err);
        });
    res.redirect("/chats");
});

//new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});


app.get("/chats", async (req, res) => {

    let result = await Chat.find();
    // console.log(result);
    res.render("index.ejs", { result });
});


app.get("/", (req, res) => {
    res.send("root is working");
});


app.listen(8080, () => {
    console.log("server is listening at -- 8080");
});