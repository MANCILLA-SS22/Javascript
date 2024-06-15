//Using useState
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../features/posts/postsSlice";
import { selectAllUsers } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

function AddPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    function onTitleChanged(event) {
        setTitle(event.target.value);
    }

    function onContentChanged(event) {
        setContent(event.target.value);
    }

    function onAuthorChanged(event) {
        setUserId(event.target.value);
    }

    function onSavePostClicked() {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId })).unwrap(); //"unwrap" returns a new promise that either has the action payload or if it's the rejected action so that lets us use this try-catch.
                setTitle('');
                setContent('');
                setUserId('');
                navigate("/");
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setAddRequestStatus('idle');
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

/*//Using useRef
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
    const titleRef = useRef('');
    const contentRef = useRef('');
    const userIdRef = useRef('');

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);  // Esto es igual a --> const users = useSelector(state => state.users);

    const canSave = Boolean(titleRef.current) && Boolean(contentRef.current) && Boolean(userIdRef.current);

    function onTitleChanged(event) {
        titleRef.current = event.target.value;
    }

    function onContentChanged(event) {
        contentRef.current = event.target.value;
    }

    function onAuthorChanged(event) {
        userIdRef.current = event.target.value;
    }

    function onSavePostClicked() {
        const title = titleRef.current;
        const content = titleRef.current;
        const userId = titleRef.current;

        if (title && content) {
            dispatch(postsActions.postAdded(title, content, userId));
            titleRef.current = "";
            contentRef.current = "";
            userIdRef.current = "";
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" ref={titleRef} onChange={onTitleChanged} />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" ref={userIdRef} onChange={onAuthorChanged}>
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
                <textarea id="postContent" name="postContent" ref={contentRef} onChange={onContentChanged} />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm; */