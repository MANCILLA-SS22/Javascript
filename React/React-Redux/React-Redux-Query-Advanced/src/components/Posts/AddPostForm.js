import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../../features/posts/postsSlice";

function AddPostForm() {
    const [addNewPost, { isLoading }] = useAddNewPostMutation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const users = useSelector(selectAllUsers);

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    function onTitleChanged(e){
        setTitle(e.target.value);
    }

    function onContentChanged(e){
        setContent(e.target.value);
    }

    function onAuthorChanged(e){
        setUserId(e.target.value);
    }

    async function onSavePostClicked() {
        if (canSave) {
            try {
                await addNewPost({ title, body: content, userId }).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            } catch (err) {
                console.error('Failed to save the post', err);
            }
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {
                        users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))
                    }
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave} >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm;