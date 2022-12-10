const Issuedbook = require("../models/issuedBooks.js");

exports.create = (req, res) => {
  if (!req.body.bookId) {
    return res.status(400).send({
      message: "BookId cannot be Empty",
    });
  }
  if (!req.body.issueDate) {
    return res.status(400).send({
      message: "Issue Date cannot be Empty",
    });
  }
  if (!req.body.userId) {
    return res.status(400).send({
      message: "UserId cannot be Empty",
    });
  }
  if (!req.body.returnDate) {
    return res.status(400).send({
      message: "Return Date cannot be Empty",
    });
  }
  const issuedbook = new Issuedbook({
    bookId: req.body.bookId,
    issueDate: req.body.issueDate,
    userId: req.body.userId,
    returnDate: req.body.returnDate,
  });
  issuedbook
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some Error has occured during creating issued book details",
      });
    });
};
exports.findAll = (req, res) => {
  Issuedbook.find()
    .then((issuedbooks) => {
      res.send(issuedbooks);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while finding the issuedbook details",
      });
    });
};

exports.findOne = (req, res) => {
  Issuedbook.findById(req.params.bookId)
    .then((issuedbook) => {
      if (!issuedbook) {
        return res.status(404).send({
          message: "issuedbook not found with id " + req.params.bookId,
        });
      }
      res.send(issuedbook);
    })
    .catch((err) => {
      if (err.kind === "objectId") {
        return res.status(404).send({
          message: "issuedbook not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error finding issuedbook with id " + req.params.bookId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.bookId) {
    return res.status(400).send({
      message: "BookId cannot be Empty",
    });
  }
  if (!req.body.issueDate) {
    return res.status(400).send({
      message: "Issue Date cannot be Empty",
    });
  }
  if (!req.body.userId) {
    return res.status(400).send({
      message: "UserId cannot be Empty",
    });
  }
  if (!req.body.returnDate) {
    return res.status(400).send({
      message: "Return Date cannot be Empty",
    });
  }
  Issuedbook.findByIdAndUpdate(
    req.params.bookId,
    {
      bookId: req.body.bookId,
      issueDate: req.body.issueDate,
      userId: req.body.userId,
      returnDate: req.body.returnDate,
    },
    { new: true }
  )
    .then((issuedbook) => {
      if (!issuedbook) {
        return res.status(404).send({
          message: "issuedbook not found with id " + req.params.bookId,
        });
      }
      res.send(issuedbook);
    })
    .catch((err) => {
      if (err.kind === "objectId") {
        return res.status(404).send({
          message: " issuedbook not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message: "Error updating issuedbook with id " + req.params.bookId,
      });
    });
};

exports.delete = (req, res) => {
  Issuedbook.findByIdAndRemove(req.params.bookId)
    .then((issuedbook) => {
      if (!issuedbook) {
        return res.status(404).send({
          message: "issuedbook not found with id " + req.params.bookId,
        });
      }
      res.send({ message: "issuedbook deleted Successfully!" });
    })
    .catch((err) => {
      if (err.kind === "objectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "issuedbook not found with id " + req.params.bookId,
        });
      }
      return res.status(500).send({
        message:
          "Could not delete issuedbook with id " + req.params.bookId,
      });
    });
};
