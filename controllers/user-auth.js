const Users = require('../models/users');

exports.getInscription = (req,res,next)=>{
    res.render('inscription');
}

exports.postInscription = async(req,res,next)=>{
    //gestion de l'inscription

    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const userInfo = {
        pseudo,
        password,
        picture:'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg'

    }
    const done = await new Users(userInfo);
    if(done){
        res.redirect("/");
    }

    
}

exports.getConnexion = (req,res,next)=>{

}

exports.postConnexion = (req,res,next)=>{

}