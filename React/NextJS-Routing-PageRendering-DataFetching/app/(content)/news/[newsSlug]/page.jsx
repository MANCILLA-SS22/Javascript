import Link from "next/link";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

async function NewsDetailPage({ params }){
    const {newsSlug} = params;
    const newsItem = await getNewsItem(newsSlug);
    if (!newsItem) notFound();

    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </Link>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    );
}

export default NewsDetailPage;