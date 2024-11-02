import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content"
import { getPostData, getPostsFiles } from "../../helpers/posts-util";

function PostDetailPage(props) {
    return (
        <>
            <Head>
                <title>{props.post.title}</title>
                <meta name='description' content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </>
    )
};

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    const postData = getPostData(slug);

    return {
        props: {
            post: postData
        },
        revalidate: 600 //(1)
    }
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();
    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, '')); // removes the file extension
    const res = slugs.map(function (slug) {
        return {
            params: { slug: slug }
        }
    });

    return {
        paths: res,
        fallback: false
    }
}

export default PostDetailPage;

//(1)
//Here, we're not going through all the posts. We're fetching the data for a single post (this will be very fast). And if we set revalidate to let's say 600 here, then we ensure, that if we ever updated a
//markdown file, without rebuilding the entire application, that then still, we do get that latest data, at least once every 10 minutes. So that we don't have to rebuild the entire application, just because
//we fixed a typo in one of our markdown files. We could do this here, because here, rebuilding after deployment, will be much faster than if we do it for the other pages, where we have to go through all the post
//files, which takes a bit longer. And therefor would slow down, some of the requests. Here, it would not slow down the requests at all, or not by much at least. And we only do it once every 10 minutes anyways.