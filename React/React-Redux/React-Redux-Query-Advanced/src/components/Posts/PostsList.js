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

//Error handling: If your query or mutation happens to throw an error when using fetchBaseQuery, it will be returned in the error property of the respective hook.
//The component will re-render when that occurs, and you can show appropriate UI based on the error data if desired. Some error display examples are: "Query Error" and "Mutation Error".

// //Query Error
// function PostsList() {
//     const { data, error } = useGetPostsQuery()

//     return (
//         <div>
//             {error.status} {JSON.stringify(error.data)}
//         </div>
//     )
// }

// // Mutation Error
// function AddPost() {
//     const [addPost, { error }] = useAddPostMutation()

//     return (
//         <div>
//             {error.status} {JSON.stringify(error.data)}
//         </div>
//     )
// }