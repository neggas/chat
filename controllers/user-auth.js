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
    const user = await new Users(userInfo);
    const done = await user.save();
    if(done){
        return res.redirect("/connexion");
    }else{
        console.log("pas pus save")
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
       if(req.body.password !== userDoc.password){
          
            req.flash('erreur-auth',"le mot de passe ne corespond pas à celui du compte");
            res.render("connexion");
            console.log("je redirectionne");
       }else{
           req.session.isLogged = true;
           req.session.UserDoc = userDoc;
           req.session.save();
           return res.redirect('/');
       }
    }
}