// Using server components and SQL-lite (Best way)
import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

export default async function NewsPage() {
    const news = await getAllNews();

    return <>
        <h1>News Page</h1>
        <NewsList news={news} />
    </>
};

/* // Using server components
import NewsList from '@/components/news-list';

export default async function NewsPage() {
    const response = await fetch('http://localhost:8080/news');
    if(!response.ok) throw new Error("Failed to fetch news!");
    const news = await response.json();

return <>
        <h1>News Page</h1>
        <NewsList news={news} />
    </>
}; */

/* // Using client components
'use client'

import { useEffect } from 'react';
import NewsList from '@/components/news-list';

export default function NewsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [news, setNews] = useState();

    useEffect(() => {
        async function fetchNews() {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/news');

            if (!response.ok) {
                setError('Failed to fetch news.');
                setIsLoading(false);
            }
            const news = await response.json();
            setIsLoading(false);
            setNews(news);
        }

        fetchNews();
    }, []);

    let newsContent;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (news) newsContent = <NewsList news={news} />

    return <>
        <h1>News Page</h1>
        {newsContent}
    </>
};
*/