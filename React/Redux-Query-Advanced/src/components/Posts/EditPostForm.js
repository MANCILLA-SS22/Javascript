import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { useUpdatePostMutation, useDeletePostMutation, selectPostById } from '../../features/posts/postsSlice'
import { selectAllUsers } from "../../features/users/usersSlice";

function EditPostForm() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [updatePost, { isLoading }] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    if (!post) return <section section > <h2>Post not found!</h2></section>;

    const canSave = [title, content, userId].every(Boolean) && !isLoading;
    const usersOptions = users.map(user => <option key={user.id} value={user.id} >{user.name}</option>);

    function onTitleChanged(event) { 
        setTitle(event.target.value) 
    };

    function onContentChanged(event) { 
        setContent(event.target.value) 
    };

    function onAuthorChanged(event) { 
        setUserId(Number(event.target.value)) 
    };

    async function onSavePostClicked() {
        if (canSave) {
            try {
                await updatePost({ id: post.id, title, body: content, userId }).unwrap();
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    };

    async function onDeletePostClicked() {
        try {
            await deletePost({ id: post.id }).unwrap()
            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    };

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged}/>
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged}/>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
                <button className="deleteButton" type="button" onClick={onDeletePostClicked}>Delete Post</button>
            </form>
        </section>
    )
}

export default EditPostForm