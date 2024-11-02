import { Routes, Route } from 'react-router-dom'
import Layout from './components/layouts/Layout'
import Public from './components/layouts/Public'
import Login from './components/auth/Login'
import Welcome from './components/auth/Welcome'
import RequireAuth from './components/auth/RequireAuth'
import UsersList from './components/users/UsersList'

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