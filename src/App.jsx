import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Publish from './pages/Publish';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

export default function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}
