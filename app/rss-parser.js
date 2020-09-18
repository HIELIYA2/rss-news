const Message = require('../app/controllers/message.js');
const request = require('request');
var xml2js = require('xml2js');
const axios = require('axios');

let convertCharts = (str) => {
  return str
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

exports.rssData = async (url) => {
  //Get xml from site
  const xml = await axios.get(url);

  //Replacing the document to json
  let jsonXml;
  await xml2js.parseString(xml.data, (err, result) => {
    if (err) {
      throw err;
    }
    jsonXml = result.rss.channel[0].item;
  });
  console.dirxml(jsonXml);

  //Send json to databasen
  Promise.all(
    jsonXml.map((item) => ({
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
};
