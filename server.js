//configure routes, pages, etc
const express = require("express");
const hbs = require("hbs");

var app = express();

//app.set allows set various express related config
// keyvalue pair {what you want set : what you want use}
// mkdir views : default dir express uses
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public")) //static takes the absolute path you want to serve up
//__dirname gets passed to our file via a wrapper function
//  it stores the path to your projects dir
//what this does is that you can now store static html pages in a folder called "public"
//and those pages will be server without having to create routes.

// ***************************************************************************** ROUTES
//challange: render template when someone visits root
//replace json data will res.render to home.hbs
//inside home.hbs : new property welcomeMessage inside <p>
//also using same peoepry as about uses right now.

app.get("/",(req,res)=>{
    // res.send("Hello express!")
    // res.send("<h1>Hello express!</h1>")
    // res.send({ name: 'vsparrow',       likes: ["cats", "cars", "coffee"] });
    res.render("home.hbs", 
    {   
        pageTitle : "HomePage", 
        currentYear : new Date().getFullYear(), 
        welcomeMessage : "Welcome To My Website"
    });
})


app.get("/about",(req,res)=>{
    // res.send("About page")
    res.render("about.hbs",
    {pageTitle : "About Page", currentYear : new Date().getFullYear()}); //objects passed to about
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
