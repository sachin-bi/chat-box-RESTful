const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats =
    [
        {
            from: "akash",
            to: "suman",
            msg: "this is cat",
            created_at: new Date(),
        },
        {
            from: "laha",
            to: "somnath",
            msg: "heat sheet nm",
            created_at: new Date(),
        },
        {
            from: "bittu",
            to: "ayan",
            msg: "yo man!",
            created_at: new Date(),
        },
        {
            from: "cow",
            to: "ray",
            msg: "hemma here",
            created_at: new Date(),
        },
        {
            from: "raju",
            to: "priya",
            msg: "i lob u?",
            created_at: new Date(),
        },
    ];

// Chat.insertMany(allChats);