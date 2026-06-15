import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({
    studentId: '',
    password: '',
    confirmPassword: '',
    verifyCode: '',
  });
  const [error, setError] = useState('');

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  }

  function handleLogin() {
    if (!form.studentId.trim() || !form.password.trim()) {
      setError('请输入学号和密码');
      return;
    }
    const ok = login(form.studentId, form.password);
    if (ok) {
      navigate('/home', { replace: true });
    } else {
      setError('登录失败，请重试');
    }
  }

  function handleRegister() {
    if (!form.studentId.trim() || !form.password.trim()) {
      setError('请填写所有必填项');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('两次密码不一致');
      return;
    }
    const ok = login(form.studentId, form.password);
    if (ok) {
      navigate('/home', { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/jlu-logo.png"
            alt="吉林大学校徽"
            className="h-12 w-auto mx-auto mb-2"
          />
          <h1 className="text-lg font-bold text-primary">吉大互助</h1>
          <p className="text-xs text-gray-500 mt-1">统一身份认证平台</p>
        </div>

        {/* Tab 切换 */}
        <div className="flex mb-5 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === 'login' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
            }`}
          >
            登录
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === 'register' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
            }`}
          >
            去注册
          </button>
        </div>

        {/* 表单 */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="学号"
              value={form.studentId}
              onChange={e => handleChange('studentId', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="密码"
              value={form.password}
              onChange={e => handleChange('password', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {tab === 'register' && (
            <>
              <div>
                <input
                  type="password"
                  placeholder="确认密码"
                  value={form.confirmPassword}
                  onChange={e => handleChange('confirmPassword', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="验证码"
                  value={form.verifyCode}
                  onChange={e => handleChange('verifyCode', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-2.5 rounded-lg whitespace-nowrap hover:bg-gray-200 transition-colors">
                  获取验证码
                </button>
              </div>
            </>
          )}

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={tab === 'login' ? handleLogin : handleRegister}
            className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            {tab === 'login' ? '登录' : '注册'}
          </button>
        </div>
      </div>
    </div>
  );
}
