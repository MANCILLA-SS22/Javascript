import Link from "next/link";

function NewsList({news}) {
    return (
        <ul className="news-list">
            {
                news.map(function(newsItem) {
                    return <>
                        <li key={newsItem.id}>
                            <Link href={`/news/${newsItem.slug}`}>
                                <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                                <span>{newsItem.title}</span>
                            </Link>
                        </li>
                    </>
                }
                )}
        </ul>
    )
}

export default NewsList;