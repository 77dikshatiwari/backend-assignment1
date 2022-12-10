const User = require("../models/userSchema.js");

exports.create=(req, res)=>{
if(!req.body.address){
    return res.status(400).send({
        message: "address cannot be Empty"
    });
}
if(!req.body.username){
    return res.status(400).send({
        message:"username cannot be Empty"
    });
}

if(!req.body.userId){
    return res.status(400).send({
        message:"userId cannot be Empty"
    });
}


const user= new User({
    username: req.body.username||" No Name",
    address: req.body.address,
    userId: req.body.userId

});

user.save()
.then(data=>{
    res.send(data);
}).catch(err=>{
    res.status(500).send({
        message:err.message|| "Some Error has occured during creating user"
    });
});
};
exports.findAll=(req,res)=>{
User.find()
.then(users=>{
    res.send(users);
}).catch(err=>{
    res.status(500).send({
        message:err.message || "Some error occured while finding the user"
    });
});
};

exports.findOne=(req, res)=>{
const {_id}= req.params;
    User.findById({objectId:_id})
.then(user=>{
    if(!user){
        return res.status(404).send({
            message:"User not found with id " + req.params.userId
        });
    }
    res.send(user); 
}).catch(err=>{
    if(err.kind ==="objectId"){
        return res.status(404).send({
            message:"User not found with id " + req.params.userId
        });
    }
    return res.status(500).send({
        message:"Error finding user with id " + req.params.userId
    });
});
};

exports.update=(req, res)=>{
if(!req.body.username){
    return res.status(400).send({
        message:"Username cannot be empty"
    });
}
if(!req.body.address){
    return res.status(400).send({
        message:"Address cannot be empty"
    });
}
if(!req.body.userId){
    return res.status(400).send({
        message:"UserId cannot be empty"
    });
}
User.findByIdAndUpdate(req.params.userId,
    {
        username:req.body.username ||" No Name",
        address: req.body.address,
        userid: req.body.userId
    },{new:true})
    .then(user=>{
        if(!user){
            return res.status(404).send({
                message:"User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err =>{
        if(err.kind ==="objectId"){
            return res.status(404).send({
                message:" User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message:"Error updating user with id " + req.params.userId
        });
    });
};

exports.delete=(req, res)=>{
  User.findByIdAndRemove(req.params.userId)
  .then(user=>{
    if(!user){
        return res.status(404).send({
            message:"User not found with id " + req.params.userId
        });
    }
    res.send({message:"User deleted Successfully!"});
  }).catch(err=>{
    if(err.kind==="objectId"|| err.name ==="NotFound"){
        return res.status(404).send({
            message:"User not found with id " + req.params.userId
        });
    }
    return res.status(500).send({
        message:"Could not delete User with id "+ req.params.UserId
    });
  });
};