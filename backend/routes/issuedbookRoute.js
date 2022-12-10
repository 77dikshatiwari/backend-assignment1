module.exports= (app)=>{
    const issuedBook= require("../controllers/issuedbookController");

    app.post("/issuedBook", issuedBook.create);

    app.get("/issuedBook", issuedBook.findAll);

    app.get("issuedBook/:bookId", issuedBook.findOne);

    app.put("/issuedBook/:bookId", issuedBook.update);

    app.delete('/issuedBook/:bookId', issuedBook.delete);
}