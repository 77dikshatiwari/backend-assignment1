const mongoose= require("mongoose");

const bookDetailsSchema= mongoose.Schema({
    bookId:{type:String, required:true},
    title:{type:String, required:true},
    authors:{type:String, required:true},
    genre:{type:String, required:true},
    totalbooks:{type:Number, required:true},
    remainingbooks:{type:Number, required:true},
    }, {timestamps:true});

module.exports= mongoose.model('BookDetails', bookDetailsSchema);