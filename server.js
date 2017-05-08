//configure routes, pages, etc
const express = require("express");
var app = express();
app.use(express.static(__dirname + "/public")) //static takes the absolute path you want to serve up
//__dirname gets passed to our file via a wrapper function
//  it stores the path to your projects dir
//what this does is that you can now store static html pages in a folder called "public"
//and those pages will be server without having to create routes.

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
 
app.listen(process.env.PORT, process.env.IP,()=>{
    console.log("Server is up")
});
// app.li
