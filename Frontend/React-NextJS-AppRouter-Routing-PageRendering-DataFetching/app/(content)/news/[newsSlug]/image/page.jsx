import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';

async function ImagePage({ params }) {
    const { newsSlug } = params;
    const newsItem = await getNewsItem(newsSlug);
    if (!newsItem) notFound();

    return (
        <div className="fullscreen-image">
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
    );
};

export default ImagePage;