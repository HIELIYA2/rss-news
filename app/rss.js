module.exports = () => {
  const rssParser = require('./rss-parser.js');

  const URLtheblockcrypto = 'https://www.theblockcrypto.com/rss.xml';
  const URLcointelegraph = 'https://cointelegraph.com/rss';

  setInterval(() => {
    rssParser.rssData(URLcointelegraph);
    rssParser.rssData(URLtheblockcrypto);
  }, 15000);
};
