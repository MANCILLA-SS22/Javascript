import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "../../features/posts/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
    
    const orderedPostIds = useSelector(selectPostIds);

    let content;
    if (isLoading) content = <p>"Loading..."</p>;
    if (isError)  content = <p>{error}</p>;
    if (isSuccess) content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />);

    return <section>{content}</section>;
}

export default PostsList;