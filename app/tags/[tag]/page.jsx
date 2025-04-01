"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Link from 'next/link';

import { slugify } from '@/util/functions/support';

import {
    getFeed
} from '@/util/functions/client/func';

const TagPage = () => {

  const router = useRouter();

  const { tag } = useParams();  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const decodedTag = decodeURIComponent(tag); // Decode URL-encoded tags

    useEffect(() => {

        (async () => {

            let rr = await getFeed();
            setArticles(rr);
            setLoading(false);

        })();

    }, []);

    const filteredArticles = articles.filter((article) => article.tags.includes(decodedTag));
    
  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Articles tagged: #{decodedTag}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            loading ? ('Loading') : (
                                filteredArticles.length > 0 ? (
                                    filteredArticles.map((article, index) => (
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
                                                        href={''}
                                                        key={index}
                                                        className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300 text-black cursor-pointer"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            router.push(`/tags/${encodeURIComponent(tag)}`);
                                                        }}
                                                    >
                                                        #{tag}
                                                    </button>
                                                    ))}
                                            </div>
                                            <span className="text-sm text-gray-500 mt-2 block self-start">{new Date(article.pubDate).toLocaleDateString()}</span>
                                        </Link> )
                                        )) : (
                                                <p className="text-center text-gray-500">No articles found with this tag.</p>
                                            )
                            )
                        }
                    
        </div>
        
        
    </div>
  )
}

export default TagPage;