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
          <Route path="*" element={<div style={{padding:40,fontFamily:'sans-serif'}}>
            <h1 style={{color:'#003366'}}>吉大技能共享平台</h1>
            <p>如果你看到这行字，说明 React 渲染正常，问题出在路由匹配上。</p>
            <p>当前路径：{typeof window !== 'undefined' ? window.location.pathname : ''}</p>
            <a href="/home">去首页</a>
          </div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
