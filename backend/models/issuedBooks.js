const mongoose= require("mongoose");

const issuedBooksSchema = mongoose.Schema({
    bookId:{type:String, required:true},
    issueDate: {type:Date, default:Date.now, required:true},
    userId:{type:String, required:true},
    returnDate:{type:Date, default:Date.now, required:true},
},{timestamps:true});

module.exports= mongoose.model('Issuedbooks', issuedBooksSchema);