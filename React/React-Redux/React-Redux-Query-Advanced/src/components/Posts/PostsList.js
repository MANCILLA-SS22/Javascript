import { useSelector } from "react-redux";
import { selectPostIds, selectPostsData, useGetPostsQuery } from "../../features/posts/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
    const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
    const orderedPostIds = useSelector(selectPostIds);

    let content;
    if (isLoading) content = <p>"Loading..."</p>;
    if (isError)  content = <p>{error}</p>;
    if (isSuccess) content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />); //Metodo 1
    // if (isSuccess) content = data.ids.map(postId => <PostsExcerpt key={postId} postId={postId} />);    //Metodo 2

    return <section>{content}</section>;
}

export default PostsList;