import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../data/store';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, adminLogin } = useAdminStore();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdminLoggedIn) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  function handleSubmit() {
    if (!account.trim() || !password.trim()) {
      setError('请输入账号和密码');
      return;
    }
    const ok = adminLogin(account, password);
    if (ok) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('账号或密码错误');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🛡️</div>
          <h1 className="text-lg font-bold text-gray-800">管理员登录</h1>
          <p className="text-xs text-gray-500 mt-1">勤工助学中心管理后台</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="管理员账号"
            value={account}
            onChange={e => { setAccount(e.target.value); setError(''); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <input
            type="password"
            placeholder="管理员密码"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-gray-800 transition-colors btn-press"
          >
            登录管理后台
          </button>
          <p className="text-xs text-gray-400 text-center">
            测试账号：admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
