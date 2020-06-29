const secureAuth = (req,res,next)=>{
    if(req.session.isLogged){
        next();
    }else{
        return res.redirect('/connexion');
    }
}

module.exports = secureAuth;