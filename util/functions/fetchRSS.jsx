const Parser = require('rss-parser');
const parser = new Parser();

const slugify = (sentence) => sentence.toLowerCase().replace(/\s+/g, '-');

export async function getFeedSrv () {

    const feed = await parser.parseURL('https://unhingedchicks.com/xml/rss.xml'); 
    
    return feed.items.map(item => ({
        title: item.title,
        isoDate: item.isoDate,
        link: item.link,
        contentSnippet: item.contentSnippet,
        slug: slugify(item.title),
        pubDate: item.pubDate,
        guid: item.guid,
        enclosure: item.enclosure,
        content: item.content
    }));

}