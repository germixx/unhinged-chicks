'use client';

import Head from 'next/head';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
    getFeeds,
    getFeed
} from '../util/functions/client/func';

import { slugify } from '@/util/functions/support';

import DisqusComments from "@/components/DisqusComments";

export default function Home() {

    const [articles, setArticles] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {

        (async () => {

            // let results = await getFeeds();
            // console.log(results, ' is results')
            // setArticles(results);

            let rr = await getFeed();
            // console.log(rr, ' is rr')
            setArticles(rr)
        })();

    }, []);

     // Filter articles by selected tag
    const filteredArticles = selectedTag
        ? articles.filter((article) => article.tags.includes(selectedTag))
        : articles;
    
    return (
        <div>
            <Head>
                <title>Unhinged Chicks</title>
                <meta name="description" content="Your go-to source for the wildest, most outrageous stories of women breaking the law, causing chaos, and making headlines. 
                  From bizarre crimes to public meltdowns, we cover the most unhinged moments with no filter." />
                {/* <link rel="stylesheet" href="/styles/global.css" /> */}
                <link rel="alternate" type="application/rss+xml" title="Unhinged Chicks" href="https://unhingedchicks.com/xml/rss.xml" />

            </Head>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Latest News</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* {articles.map((article, index) => (
                        <Link
                            key={index}
                            href={`/news/${slugify(article.slug)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition flex flex-col h-full"
                        >
                            {article.enclosure?.url && (
                                <img src={article.enclosure.url} alt={article.title} className="w-full h-48 object-cover rounded-md" />
                            )}
                            <h2 className="text-xl font-semibold mt-3 text-black">{article.title}</h2>
                            <p className="text-gray-600 mt-2 flex-grow">{article.contentSnippet}</p>
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
                            <span className="text-sm text-gray-500 mt-2 block self-start">{new Date(article.pubDate).toLocaleDateString()}</span>
                        
                        </Link>
                    ))} */}
                          {filteredArticles.map((article, index) => (
                             <Link
                                key={index}
                                href={`/news/${slugify(article.slug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition flex flex-col h-full"
                            >
                                {article.enclosure?.url && (
                                    <img src={article.enclosure.url} alt={article.title} className="w-full h-48 object-cover rounded-md" />
                                )}
                                <h2 className="text-xl font-semibold mt-3 text-black">{article.title}</h2>
                                <p className="text-gray-600 mt-2 flex-grow">{article.contentSnippet}</p>
                                <div className="flex justify-center gap-2 mt-3" onClick={(e)=> e.stopPropagation()}>
                                    {article.tags.map((tag, index) => (
                                        <button
                                            key={index}
                                            className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300 text-black cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTag(tag)} 
                                            }
                                        >
                                            #{tag}
                                        </button>
                                        ))}
                                </div>
                                <span className="text-sm text-gray-500 mt-2 block self-start">{new Date(article.pubDate).toLocaleDateString()}</span>
                            
                            </Link>
                            ))}
                               {selectedTag && (
                                    <div className="flex justify-center mt-6">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => setSelectedTag(null)}
                                    >
                                        Clear Filter (#{selectedTag})
                                    </button>
                                    </div>
                                )}
                </div>
            </div>
            <DisqusComments
                shortname="unhinged-chicks"  // Replace with your Disqus shortname
                url={typeof window !== "undefined" ? window.location.href : ""}
                identifier="article-123" // Unique identifier for the post
            />
        </div>
    );
}