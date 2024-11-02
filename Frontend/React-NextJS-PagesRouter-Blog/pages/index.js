import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero"
import { getFeaturedPosts } from "../helpers/posts-util";

function HomePage(props) {
    return (
        <>
        <Head>
            <title>German's Blog</title>
            <meta name='description' content='I post about programming and web development'/>
        </Head>
            <Hero />
            <FeaturedPosts posts={props.posts}/>
        </>
    )
}

export function getStaticProps(){
    const featuredPosts = getFeaturedPosts();
    
    return {
        props: {
            posts: featuredPosts
        },
        revalidate: 60
    }  
};


export default HomePage;