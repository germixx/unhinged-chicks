
const slugify = (sentence) => sentence.toLowerCase().replace(/\s+/g, '-');

async function getFeed () {
    
    const response = await fetch('/api/rss');
    
    const data = await response.json();

    return data.items.map(item => ({
        title: item.title,
        isoDate: item.isoDate,
        link: item.link,
        contentSnippet: item.contentSnippet,
        slug: slugify(item.title),
        pubDate: item.pubDate,
        description: item.description,
        guid: item.guid,
        enclosure: item.enclosure,
        content: item.content
    }));

}







async function getFeeds () {
    try {

        const response = await fetch('/api/rss/feeds');

        const data = await response.json();

        return data.articles;

    } catch (error) {

        console.error('Error fetching articles:', error);

    }
}


module.exports = { 
    getFeed,
    getFeeds
}