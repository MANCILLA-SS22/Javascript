import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import Public from './components/Layouts/Public';
import Login from './components/auth/Login';
import Welcome from './components/auth/Welcome';
import UsersList from './components/users/UsersList';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;