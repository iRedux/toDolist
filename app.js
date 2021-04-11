const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let items = [];
let isActive = [];

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
    res.render('index', {day: day, newListItem: items, isActive: isActive});
});

app.post("/", function(req, res){
    let item = req.body.toDo;
    if(item) {
        items.push(item);
        isActive.push({
            itemId: (items.length) - 1,
            isActive: false
        });
    }
    
    res.redirect("/"); 
});

app.post("/active", function(req, res){
    req.on("data", function(data){
        let itemData = JSON.parse(data);
        let itemId = itemData.x;

        isActive.forEach(function(item){
            if(item.itemId === itemId) {
                if(JSON.stringify(isActive[itemId].isActive) === "true") {
                    isActive[itemId].isActive = false;
                } else {
                    isActive[itemId].isActive = true;
                }
                    
            }
        });    
    });
});

app.post("/delete", function(req, res){
    let item = parseFloat(req.body.item);
    let starting = parseFloat(req.body.item - 1);

    if(item){
        items.splice(starting, 1);
    }

    res.redirect("/");
});

app.listen(process.env.PORT || port, function(){
    console.log("Server is up");
});
