import { notFound } from 'next/navigation';
import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';

async function InterceptedImagePage({ params }) {
    const id = params.newsSlug;
    const newsItem = await getNewsItem(id)
    if (!newsItem) notFound();

    return <>
        <ModalBackdrop/>
        <dialog className="modal" open>
            <div className="fullscreen-image">
                <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            </div>
        </dialog>
    </>
};

export default InterceptedImagePage;

//We can only use async-await on a component if it's not a client component