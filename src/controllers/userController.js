const { User } = require("../db/models/user.model");


class userController{

    static getAllUsers = (req, res) => {
        User.find().then((user) => {
            res.status(200).send(user);
        });    
    }

    static addNewUser = (req, res) => {
        let user = req.body;
        let newUser = new User(user);
    
        newUser.save( (err, userDoc) => {
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            else{
                res.status(200).send({"id": userDoc._id});
            }
        })
    }
    
    static updateUser = (req,res) => {
        let update = req.body;
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