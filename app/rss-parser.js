const Message = require('../app/controllers/message.js');
const Parser = require('rss-parser');
let parser = new Parser();

exports.rssData = async (url) => {
  let feed = await parser
    .parseURL(url)
    .then((res) => {
      console.log('!!!!!!!!!', res);
    })
    .catch((err) => {
      console.log('???????????', err);
    });
  console.log(feed);
  Promise.all(
    feed.items.map((item) => ({
      Title: item.title,
      PubDate: item.pubDate,
      Content: convertCharts(item.content),
    }))
  )
    .catch((err) => {
      console.log('1111111111', err);
    })
    .then((value) => {
      value.map((i) => {
        Message.create(i);
      });
    });
};

let convertCharts = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};
