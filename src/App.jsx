import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './data/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
            <div style={{padding:40,fontFamily:'sans-serif'}}>
              <h1 style={{color:'#003366'}}>吉大技能共享平台</h1>
              <p>AuthProvider + Store 加载正常！</p>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
