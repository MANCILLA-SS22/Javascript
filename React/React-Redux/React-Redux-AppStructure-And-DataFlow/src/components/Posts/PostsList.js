import { useSelector } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus } from "../../features/posts/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
    const posts = useSelector(selectAllPosts);      //Esto es igual a --> const posts = useSelector(state => state.posts.posts);
    const postStatus = useSelector(getPostsStatus); //Esto es igual a --> const posts = useSelector(state => state.posts.status);
    const error = useSelector(getPostsError);       //Esto es igual a --> const posts = useSelector(state => state.posts.error);

    let content;
    if (postStatus === 'loading') content = <p>"Loading..."</p>;
    if (postStatus === 'failed')  content = <p>{error}</p>;
    if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />);
    };

    return <section>{content}</section>;
}

export default PostsList;

/* import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "../../features/posts/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);      //Esto es igual a --> const posts = useSelector(state => state.posts.posts);
    const postStatus = useSelector(getPostsStatus); //Esto es igual a --> const posts = useSelector(state => state.posts.status);
    const error = useSelector(getPostsError);       //Esto es igual a --> const posts = useSelector(state => state.posts.error);

    let content;
    if (postStatus === 'loading') content = <p>"Loading..."</p>;
    if (postStatus === 'failed') content = <p>{error}</p>;
    if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />);
    }

    useEffect(() => {
        if (postStatus === 'idle') dispatch(fetchPosts());
    }, [postStatus, dispatch]);

    return <section>{content}</section>;
}

export default PostsList; */