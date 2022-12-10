const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    username:{type:String, required:true},
    address:{type:String, required:true},
    userId:{type:String, required:true}
}, {timestamps:true});
 module. exports= mongoose.model('User', userSchema);