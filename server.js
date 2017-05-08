//configure routes, pages, etc
const express = require("express");
var app = express();

// ***************************************************************************** ROUTES

app.get("/",(req,res)=>{
    // res.send("Hello express!")
    // res.send("<h1>Hello express!</h1>")
    res.send({
       name: 'vsparrow',
       likes: ["cats", "cars", "coffee"]
    });
})


app.get("/about",(req,res)=>{
    res.send("About page")
});

app.get("/bad",(req,res)=>{
    res.send({
        errorMessage : "Cannot fulfill request"
    })
})
// ***************************************************************************** end ROUTES
 
app.listen(process.env.PORT, process.env.IP);
// app.li
