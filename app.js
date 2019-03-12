var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// APP CONFIG
mongoose.connect("mongodb://127.0.0.1:27017/english", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var wordSchema = new mongoose.Schema({
    value: String,
    created: {type: Date, default: Date.now},
    transcription: {
        type: String,
        default: "placeholderimage.jpg"
    },
    translate: String,
    image: {
        type: String, 
        default: "placeholderimage.jpg"
    },
    memorization: String,
    parts_of_speech: String
});
var Word = mongoose.model("Word", wordSchema);

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/words");
});

// INDEX ROUTE
app.get("/words/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE

app.get("/words", function(req, res){
    Word.find({}, function(err, words){
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("index", {words: words});
        }
    });
});

// Word.create({
//     value: "moon",
//     translate: "луна",
//     memorization: "10",
//     parts_of_speech: "noun"
// })

app.listen(process.env.PORT || 5500, process.env.IP || "127.0.0.1", (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on 5500`)
});