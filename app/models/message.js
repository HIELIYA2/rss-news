const sql = require('./db.js');

// constructor
const Message = function (message) {
  this.Title = message.Title;
  this.PubDate = message.PubDate;
  this.Content = message.Content;
};

Message.create = (newMessage, result) => {
  sql.query(
    `INSERT INTO news (Title, PubDate, Content)
      SELECT * FROM (SELECT '${newMessage['Title']}'  AS Title,
       '${newMessage['PubDate']}' AS PubDate,
       '${newMessage['Content']}' AS Content) AS tmp
      WHERE NOT EXISTS (
          SELECT Title FROM news WHERE Title = '${newMessage['Title']}'
      ) LIMIT 1;`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      console.log('created message: ', { ...newMessage });
      result(null, { ...newMessage });
    }
  );
};

Message.findById = (messageId, result) => {
  sql.query(`SELECT * FROM news WHERE id = ${messageId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found message: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Message with the id
    result({ kind: 'not_found' }, null);
  });
};

Message.getAll = (result) => {
  sql.query('SELECT * FROM news', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('messages: ', res);
    result(null, res);
  });
};

Message.updateById = (id, message, result) => {
  sql.query(
    'UPDATE news SET Title = ? , PubDate = ? ,Content = ? WHERE id = ?',
    [message.Title, message.PubDate, message.Content, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Message with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated message: ', { id: id, ...message });
      result(null, { id: id, ...message });
    }
  );
};

Message.remove = (id, result) => {
  sql.query('DELETE FROM news WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Message with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted message with id: ', id);
    result(null, res);
  });
};

Message.removeAll = (result) => {
  sql.query('DELETE FROM news', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} news`);
    result(null, res);
  });
};

module.exports = Message;
