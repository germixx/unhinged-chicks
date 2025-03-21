// import { fetchRSSFeed } from '@/lib/fetchRSS';
import { getFeedSrv } from '@/util/functions/fetchRSS';
// import getFeed from '@/util/functions/client/func';
import Link from 'next/link';

import DisqusComments from "@/components/DisqusComments";

// Generate static paths for each article
export async function generateStaticParams() {
    
    const articles = await getFeedSrv();

    return articles.map(article => ({ slug: article.slug }));
}

// Fetch article data based on slug
export default async function ArticlePage({ params }) {

    const param = await params;
    // console.log(param,  ' is paramsmsms');

    const articles = await getFeedSrv();
    // console.log(articles);

    const article = articles.find(a => a.slug === param.slug);
    // console.log(article, ' is ARTICLEZ');

    if (!article) {
        return <h1>Article not found</h1>;
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl overflow-hidden mb-6">
                {article.enclosure?.url && (
                    <img src={article.enclosure.url} alt={article.title} className="w-full h-64 object-cover" />
                )}
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-black">{article.title}</h1>
                    {article.contentSnippet && (
                        <p className="text-gray-700 mb-4">{article.contentSnippet}</p>
                    )}
                    <a 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Read Full Article
                    </a>
                </div>

            </div>
            
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6">
                
                <DisqusComments 
                    shortname="unhinged-chicks"
                    url={typeof window !== "undefined" ? window.location.href : ""}
                    identifier={param.slug} // Unique identifier for the post
                />

            </div>
          
        </div>

    );
}