const Bookdetail = require("../models/bookDetails.js");

exports.create = (req, res) => {
  if (!req.body.bookId) {
    return res.status(400).send({
      message: "Title cannot be Empty",
    });
  }
  if (!req.body.genre) {
    return res.status(400).send({
      message: "Genre cannot be Empty",
    });
  }
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title cannot be Empty",
    });
  }
  if (!req.body.authors) {
    return res.status(400).send({
      message: "Authors cannot be Empty",
    });
  }

  if (!req.body.totalbooks) {
    return res.status(400).send({
      message: "totalbooks cannot be Empty",
    });
  }
  if (!req.body.remainingbooks) {
    return res.status(400).send({
      message: "remaining cannot be Empty",
    });
  }

  const bookdetail = new Bookdetail({
    bookId: req.body.bookId,
    title: req.body.title || "No Title",
    authors: req.body.authors,
    genre: req.body.genre,
    totalbooks: req.body.totalbooks,
    remainingbooks: req.body.remainingbooks,
  });

  bookdetail
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some Error has occured during creating book details",
      });
    });
};
exports.findAll = (req, res) => {
  Bookdetail
    .find()
    .then((bookdetails) => {
      res.send(bookdetails);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while finding the book details",
      });
    });
};

exports.findOne = (req, res) => {
  Bookdetail.findById(req.params.objectId)
    .then((bookdetail) => {
      if (!bookdetail) {
        return res.status(404).send({
          message: "book not found with id " + req.params.bookId,
        });
      }
      res.send(bookdetail);
    })
    .catch((err) => {
      if (err.kind === "objectId") {
        return res.status(404).send({
          message: "book not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error finding book with id " + req.params.bookId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.bookId) {
    return res.status(400).send({
      message: "Book id cannot be Empty",
    });
  }
  if (!req.body.genre) {
    return res.status(400).send({
      message: "Genre cannot be Empty",
    });
  }
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title cannot be Empty",
    });
  }
  if (!req.body.authors) {
    return res.status(400).send({
      message: "Authors cannot be Empty",
    });
  }

  if (!req.body.totalbooks) {
    return res.status(400).send({
      message: "totalbooks cannot be Empty",
    });
  }
  if (!req.body.remainingbooks) {
    return res.status(400).send({
      message: "remaining cannot be Empty",
    });
  }
  Bookdetail.findByIdAndUpdate(
    req.params.bookId,
    {
      bookId: req.body.bookId,
      title: req.body.title || "No Title",
      authors: req.body.authors,
      genre: req.body.genre,
      totalbooks: req.body.totalbooks,
      remainingbooks: req.body.remainingbooks,
    },
    { new: true }
  )
    .then((bookdetail) => {
      if (!bookdetail) {
        return res.status(404).send({
          message: "book not found with id " + req.params.bookId,
        });
      }
      res.send(bookdetail);
    })
    .catch((err) => {
      if (err.kind === "objectId") {
        return res.status(404).send({
          message: " book not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error updating book with id " + req.params.bookId,
      });
    });
};

exports.delete = (req, res) => {
  Bookdetail.findByIdAndRemove(req.params.bookId)
    .then((bookdetail) => {
      if (!bookdetail) {
        return res.status(404).send({
          message: "book not found with id " + req.params.bookId,
        });
      }
      res.send({ message: "book deleted Successfully!" });
    })
    .catch((err) => {
      if (err.kind === "objectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "book not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message:
          "Could not delete book with id " + req.params.bookId,
      });
    });
};
