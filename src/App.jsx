import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './data/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Publish from './pages/Publish';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SkillDetail from './pages/SkillDetail';
import DemandDetail from './pages/DemandDetail';
import OrderDetail from './pages/OrderDetail';
import UserProfile from './pages/UserProfile';
import Appeals from './pages/Appeals';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ContentAudit from './pages/admin/ContentAudit';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAppeals from './pages/admin/AdminAppeals';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminRules from './pages/admin/AdminRules';

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
          <Route path="user/:id" element={<UserProfile />} />
          <Route path="appeals" element={<Appeals />} />
          <Route path="login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contents" element={<ContentAudit />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="appeals" element={<AdminAppeals />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="rules" element={<AdminRules />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
