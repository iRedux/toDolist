const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let items = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    let day = new Date().toLocaleDateString('en-US', options);
    res.render('index', {day: day, newListItem: items});
});

app.post("/", function(req, res){
    let item = req.body.toDo;
    if(item) {
        items.push(item);
    }
    

    res.redirect("/"); 
});

app.listen(process.env.PORT || port, function(){
    console.log("Server is up");
});
