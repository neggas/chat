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
        return res.redirect("/connexion");
    }

}

exports.getConnexion = async (req,res,next)=>{
    return res.render('connexion');
}

exports.postConnexion = async(req,res,next)=>{
    const userDoc = await Users.findOne({pseudo:req.body.pseudo});
    if(!userDoc){
        req.flash('erreur-auth',"Le pseudo n'existe pas");
        return res.render("connexion");
    }else{
        console.log(userDoc);
    }
}