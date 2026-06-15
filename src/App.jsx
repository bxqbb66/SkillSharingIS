import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './data/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Publish from './pages/Publish';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SkillDetail from './pages/SkillDetail';
import DemandDetail from './pages/DemandDetail';
import OrderDetail from './pages/OrderDetail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="publish" element={<Publish />} />
            <Route path="messages" element={<Messages />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="skill/:id" element={<SkillDetail />} />
          <Route path="demand/:id" element={<DemandDetail />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
