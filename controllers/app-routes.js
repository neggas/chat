const Users = require('../models/users');
exports.getIndex = async(req,res,next)=>{
    const users = await Users.find();
    res.render("index",{users});
}

