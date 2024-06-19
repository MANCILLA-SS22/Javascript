import { Routes, Route, Navigate } from 'react-router-dom';
import AddPostForm from "./components/Posts/AddPostForm";
import PostsList from "./components/Posts/PostsList";
import SinglePostPage from "./components/Posts/SinglePostPage";
import EditPostForm from "./components/Posts/EditPostForm";
import Layout from './components/Layout/Layout';
import UsersList from './components/Users/UsersList';
import UserPage from './components/Users/UserPage';

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

                <Route path="user">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UserPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />  {/* Catch all - replace with 404 component if you want */}

            </Route>
        </Routes>
    );
}

export default App;
