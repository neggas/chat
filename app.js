const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require('./models/users')
const mongodbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");


const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http);

const store = new mongodbStore({
    uri:`mongodb://triel:Triel88@cluster0-shard-00-00-5befv.mongodb.net:27017,cluster0-shard-00-01-5befv.mongodb.net:27017,cluster0-shard-00-02-5befv.mongodb.net:27017/users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    collection:"sessions"
})

app.use(session({
    secret:"my secret",
    resave:false,
    saveUninitialized:false,
    store:store
}))
app.use(flash());


app.use(express.static('public'));
app.set("view engine","ejs");

//inclusions des routes 

const authUser = require("./routers/user-auth");
const appRoute = require("./routers/app-routes");

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(authUser);
app.use(appRoute);

app.use((req,res,next)=>{
    res.locals.isOnline = req.session.isLogged;
    next();
})

io.on("connection",async (socket)=>{
   const users =  await User.find();
   socket.emit("users",users);
})
const PORT = process.env.PORT || 3000;
mongoose.connect(`mongodb://triel:Triel88@cluster0-shard-00-00-5befv.mongodb.net:27017,cluster0-shard-00-01-5befv.mongodb.net:27017,cluster0-shard-00-02-5befv.mongodb.net:27017/users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,{useNewUrlParse:true,useUnifiedTopology:true})
.then(()=>{
    http.listen(PORT,()=>{
        console.log(`l'applications marche sur le port ${PORT}`);
    })
})
.catch((err)=>{
    console.log('erreur');
})