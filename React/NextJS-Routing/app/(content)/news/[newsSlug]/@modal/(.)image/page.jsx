'use client';

import { notFound, useRouter } from 'next/navigation';
import { DUMMY_NEWS } from '@/dummy-news';

export default function InterceptedImagePage({ params }) {
    const router = useRouter();
    const id = params.newsSlug;
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === id);
    if (!newsItem) notFound();

    return <>
        <div className="modal-backdrop" onClick={router.back}/>
        <dialog className="modal" open>
            <div className="fullscreen-image">
                <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            </div>
        </dialog>
    </>
};                                                                          