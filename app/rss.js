module.exports = () => {
  const rssParser = require('./rss-parser.js');

  const URLtheblockcrypto = 'https://www.theblockcrypto.com/rss.xml';
  const URLyahoo = 'https://www.yahoo.com/news/rss/world';
  const URLglobalissues = 'https://www.globalissues.org/news/feed';
  const URLtimesofindia =
    'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms';

  const URLcointelegraph = 'https://cointelegraph.com/rss';
  const URLreddit = 'reddit.com/r/worldnews/.rss';
  const URLbuzzfeed = 'buzzfeed.com/world.xml';

  // rssParser.rssData(URLtheblockcrypto);
  rssParser.rssData(URLbuzzfeed);
};
