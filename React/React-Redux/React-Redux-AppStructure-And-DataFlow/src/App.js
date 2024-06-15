import { Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsers } from './features/users/usersSlice';
import AddPostForm from "./components/Posts/AddPostForm";
import PostsList from "./components/Posts/PostsList";
import SinglePostPage from "./components/Posts/SinglePostPage";
import EditPostForm from "./components/Posts/EditPostForm";
import Layout from './components/Layout/Layout';

store.dispatch(fetchPosts());
store.dispatch(fetchUsers()); //We can call dispatch from the "store" directly instead of define "const dispatch = useDispatch()" into the App function.

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<PostsList />} />

                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>

            </Route>
        </Routes>
    );
}

export default App;
