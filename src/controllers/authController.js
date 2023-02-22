const { User }  = require('../db/models/user.model')

const jwt = require('jsonwebtoken')

exports.login=(req,res,next)=>{
    var email = req.body.email;
    var password = req.body.password;
    

    User.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password==password){
                let token = jwt.sign({email:user.email},"secretvalue",{expiresIn:'1h'})
                res.json({
                    "message":"login successful",
                    "token":token
                })
            }
            else{
                res.send("password incorrect")
            }

        }
        else{
            res.send("no user found!")
        }
    })
    
}