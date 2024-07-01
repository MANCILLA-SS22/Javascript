import { useSelector } from "react-redux";
import { selectPostIds, getPostsError, getPostsStatus } from "../../features/posts/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
    const orderedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postStatus === 'loading') content = <p>"Loading..."</p>;
    if (postStatus === 'failed')  content = <p>{error}</p>;
    if (postStatus === 'succeeded') content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />);

    return <section>{content}</section>;
}

export default PostsList;