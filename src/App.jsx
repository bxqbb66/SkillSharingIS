import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <div style={{padding:40,fontFamily:'sans-serif'}}>
            <h1 style={{color:'#003366'}}>吉大技能共享平台</h1>
            <p>React 渲染正常！问题出在路由或组件上。</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
