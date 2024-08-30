import Head from "next/head";
import AllPosts from "../../components/posts/all-posts"
import { getAllPosts } from "../../helpers/posts-util"

function AllPostsPage(props) {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta name='description' content='A list of all programming related tutorials and posts!' />
            </Head>
            <AllPosts posts={props.posts} />
        </>
    )
}

export function getStaticProps() { //Here getStaticProps makes no sense because we don't want to fetch all the posts for every request. Instead doing it once during the build process should be enough.
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts
        }
    }
}

export default AllPostsPage