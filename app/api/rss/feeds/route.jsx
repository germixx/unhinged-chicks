// pages/api/rss.js
import Parser from 'rss-parser';

export async function GET(request, res) {
    const parser = new Parser();
    const feeds = [
        'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        'https://feeds.bbci.co.uk/news/rss.xml',
        'https://www.aljazeera.com/xml/rss/all.xml'
    ];

    try {
        const results = await Promise.all(feeds.map(feed => parser.parseURL(feed)));
        // console.log(results, ' is results')
        const articles = results.flatMap(result => result.items);
        // console.log(articles, ' is articles');
        articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        // console.log(articles, ' is articles after');
        return Response.json({ articles });

    } catch (error) {
        console.error('RSS Fetch Error:', error);
        return Response.json({message: 'Failed'});
    }

}

export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}