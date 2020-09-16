const Message = require('../models/message.js');

// Create and Save a new Message
exports.create = (req, res, next) => {
  // Create a Message
  const message = new Message({
    Title: req.body.Title,
    PubDate: req.body.PubDate,
    Content: req.body.Content,
  });

  // Save Message in the database
  Message.create(message, (err, data) => {
    console.log(err);
    err ? next(err) : res.send(data);
  });
};

// Retrieve all Messages from the database.
exports.findAll = (req, res, next) => {
  Message.getAll((err, data) => {
    err ? next(err) : res.send(data);
  });
};

// Find a single Message with a messageId
exports.findOne = (req, res, next) => {
  Message.findById(req.params.messageId, (err, data) => {
    err ? next(err) : res.send(data);
  });
};

// Update a Message identified by the messageId in the request
exports.update = (req, res, next) => {
  Message.updateById(
    req.params.messageId,
    new Message(req.body),
    (err, data) => {
      err ? next(err) : res.send(data);
    }
  );
};

// Delete a Message with the specified messageId in the request
exports.delete = (req, res, next) => {
  Message.remove(req.params.messageId, (err, data) => {
    err
      ? next(err)
      : res.send({ message: `Message was deleted successfully!` });
  });
};

// Delete all Messages from the database.
exports.deleteAll = (req, res, next) => {
  Message.removeAll((err, data) => {
    err
      ? next(err)
      : res.send({ message: `All Messages were deleted successfully!` });
  });
};
