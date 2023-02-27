const { User } = require("../db/models/user.model");


class userController{

    static verifyToken = (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];
          req.token = bearerToken;
          next();
        } else {
          res.send({ result: "no login" });
        }
    }

    static getAllUsers =(req,res)=> {
        jwt.verify(req,token,secretKey,(err,authData)=>{
            if(err){
                res.send({result: "Invalid Token"})
            }
            else{
                User.find().then((user) => {
                    res.status(200).send(user);
                });    
            }
        })
    }

    static addNewUser = (req, res) => {
        let user = req.body;
        let newUser = new User(user);

        if(!(user.role === "admin" || user.role === "user")){
            return res.status(500).send({error: "Invalid role"});
        }
    
        newUser.save( (err, userDoc) => {
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            else{
                jwt.sign({newUser},secretKey,{expiresIn:'300s'},(err,token)=>{
                    res.status(200).send({"id": userDoc._id,"token":token});
                })
            }
        })
    }
    
    static updateUser = (req,res) => {
        let update = req.body;

        if(!(update.role === "admin" || update.role === "user")){
            return res.status(500).send({error: "Invalid role"});
        }

        User.findByIdAndUpdate({_id : req.params.id}, {$set: update}, (err, updatedUser) => {
            if(err){
                console.log(err);
                return res.status(500).send({message: "Error"})
            }
            res.status(200).send(updatedUser);
        });
    }

    static deleteUser = (req, res) => {
        User.findByIdAndDelete({_id: req.params.id}, (err, Deleteduser) => {
            if(err){
                console.log(err);
                return res.status(500).send({message : "Error"});
            }

            res.status(200).send(Deleteduser);
        });

    }

}

module.exports = userController