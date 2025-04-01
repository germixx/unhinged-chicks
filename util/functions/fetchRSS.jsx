const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
      item: ['custom:tags'],
    }
  });

import { slugify } from '@/util/functions/support';

export async function getFeedSrv() {

    const feed = await parser.parseURL('https://unhingedchicks.com/xml/rss.xml');
    // console.log(feed,  ' is da feedededededs')
    return feed.items.map(item => ({
        title: item.title,
        isoDate: item.isoDate,
        link: item.link,
        contentSnippet: item.contentSnippet,
        slug: slugify(item.title),
        pubDate: item.pubDate,
        guid: item.guid,
        enclosure: item.enclosure,
        content: item.content,
        tags: item['custom:tags'].split(',')
    }));

}