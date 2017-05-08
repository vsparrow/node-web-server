//configure routes, pages, etc
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

//app.set allows set various express related config
// keyvalue pair {what you want set : what you want use}
// mkdir views : default dir express uses

hbs.registerPartials(__dirname + "/views/partials")  //add support for partials 
//takes dir that you wnt to use for handlebar partial files. needs absolute dir
//to add a partial in hbs file, ex footer, use this syntax  {{> footer}}
// the footer partial lives in views/partials/footer.hbs
//nodemon server.js -e js,hbs // tells nodemon to watch js and hbs if it wont do it by default

app.set("view engine", "hbs");

//app.use is how you use middleware, it takes a function
//next tells your express when middleware   is done
//if we do something asyncronus, middle ware does not move on, only when it sees next()
//if you dont call next, your handlers for each request never fire, ie app freeze
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`
    // console.log("Now is "+ now);
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{if(err){console.log("cannot append server.log")}  });
    next();
});

// app.use((req,res,next)=>{
//     res.render("maintenance")
// })

app.use(express.static(__dirname + "/public")) //static takes the absolute path you want to serve up
// handlebar helper -> ways to register functions to run to dynamically create output     
// partial : functions you can run inside your handlebar template
// must register it //name of helper first arg, function to run as second arg
// here if getCurrentYear is called example, in footer, return the year from the function
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})  
 
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
}) 
 
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
        // currentYear : new Date().getFullYear(), //removed because create hbs.registerHelper
        welcomeMessage : "Welcome To My Website"
    });
})


app.get("/about",(req,res)=>{
    // res.send("About page")
    res.render("about.hbs",
    {pageTitle : "About Page"
    // , currentYear : new Date().getFullYear() //removed because create hbs.registerHelper
    }); //objects passed to about
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

