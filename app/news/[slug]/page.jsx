import { getFeedSrv } from '@/util/functions/fetchRSS';
import Link from 'next/link';
import DisqusComments from "@/components/DisqusComments";

// Generate static paths for each article
export async function generateStaticParams() {
    try {
        const articles = await getFeedSrv();
        
        if (!articles || !Array.isArray(articles)) {
            console.error("Error: getFeedSrv() returned an invalid response");
            return [];
        }
        return articles.map(article => ({ slug: article.slug }));
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        return [];
    }
}

// Fetch article data based on slug
export default async function ArticlePage({ params }) {
    const { slug } = await params; // Correct way to use params
    const articles = await getFeedSrv();
    const article = articles.find(a => a.slug === slug);

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
                    <div className="flex justify-center gap-2 mt-3">
                        {article.tags.map((tag, index) => (
                        <button
                            key={index}
                            className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300 text-black cursor-pointer"
                            // onClick={() => setSelectedTag(tag)}
                        >
                            #{tag}
                        </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6">
                <DisqusComments
                    shortname="unhinged-chicks"
                    url={typeof window !== "undefined" ? window.location.href : ""}
                    identifier={slug} // Unique identifier for the post
                />
            </div>
        </div>
    );
}