import { notFound } from 'next/navigation';
import { DUMMY_NEWS } from '@/dummy-news';

export default function ImagePage({ params }) {
    const id = params.newsSlug;
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === id);
    if (!newsItem) notFound();

    return (
        <div className="fullscreen-image">
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
    );
};