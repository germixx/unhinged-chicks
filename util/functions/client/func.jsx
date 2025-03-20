async function getFeed () {
    
    const response = await fetch('/api/rss');
    
    const data = await response.json();

    console.log(data.items, ' is responseseses');
    return data.items;

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