const express= require("express");
const dotenv= require("dotenv");

const app= express();
const PORT= process.env.PORT||5000;
dotenv.config({path:"configure.env"});
const mongoose= require("mongoose");
const User= require("./backend/models/userSchema")
const Issuedbooks=require("./backend/models/issuedBooks");
const BookDetails= require("./backend/models/bookDetails");
const bodyParser = require("body-parser");

mongoose.set('strictQuery', false);
 mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Successfully connected to mongodb Atlas");
})
.catch((error)=>{
    console.log("Unable to connect to MongoDB Atlas");
    console.error(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.post('' )

app.get('/', (req,res)=>{
    res.status(200);
    res.send("Here we are at server 5000");
})

require("./backend/routes/userRoute.js")(app);
require("./backend/routes/bookdetailRoute.js")(app);
require("./backend/routes/issuedbookRoute.js")(app);
app.listen(PORT, (error)=>{
    if(!error)
    console.log("Server is succesfully running on port no.", PORT)
    else
    console.log("Error occured,", error);
});

module.exports=app;