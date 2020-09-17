const Message = require('../app/controllers/message.js');
const request = require('request');
var parseString = require('xml2js').parseString;

let convertCharts = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

exports.rssData  = async (url) => {
  console.log("1");
  const xml = await request(url,  (error, response, body) => {return body})
  console.log("2" , xml);
  const feed = await parseString(xml, (err, result) => {return result.rss.channel[0].item})
  console.log("3" , feed);
  Promise.all(
    feed.map((item) => ({
      Title: item.title,
      PubDate: item.pubDate,
      Content: convertCharts(item.description),
    }))
    ).then((value) => {
      value.map((i) => {
        console.log(value);
        Message.create(i);
      });
    });
}