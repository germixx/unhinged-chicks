// pages/api/rss.js
import Parser from 'rss-parser';

export async function GET(request, res) {

    const parser = new Parser();
    
    // const feedUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';

    const feedUrl = 'https://unhingedchicks.com/xml/rss.xml';

    try {

        const feed = await parser.parseURL(feedUrl);
        return Response.json(feed);

    } catch (error) {
        console.log(error)
        return Response.json({ message: 'Method Not Allowed' }, { status: 405});
    }

    
}
























export async function POST(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}

export async function PUT(request, res) {
    return Response.json({ message: 'Method Not Allowed' }, { status: 405});
}