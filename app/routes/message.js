module.exports = (app) => {
  const messages = require('../controllers/message.js');

  // Create a new Message
  app.post('/messages', (req, res, next) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
    messages.create(req, res, next);
  });

  // Retrieve all Messages
  app.get('/messages', messages.findAll);

  // Retrieve a single Message with messageId
  app.get('/messages/:messageId', messages.findOne);

  // Update a Message with messageId
  app.put('/messages/:messageId', (req, res, next) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
    messages.update(req, res, next);
  });

  // Delete a Message with messageId
  app.delete('/messages/:messageId', messages.delete);

  // Delete all Messages
  app.delete('/messages', messages.deleteAll);
};
