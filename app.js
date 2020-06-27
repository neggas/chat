const express = require("express");



const app = express();
app.use(express.static('public'));

app.set("view engine","ejs");

//inclusions des routes 

const authUser = require("./routers/user-auth");
const appRoute = require("./routers/app-routes");

app.use(authUser);
app.use(appRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`l'applications marche sur le port ${PORT}`);
})