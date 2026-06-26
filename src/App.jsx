import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './data/store';

function TestComp() {
  try {
    const store = useStore();
    const users = store.getUsers();
    return (
      <div style={{padding:40,fontFamily:'sans-serif'}}>
        <h1 style={{color:'#003366'}}>Store 加载正常！</h1>
        <p>用户数：{users.length}</p>
        <p>订单数：{store.getOrders().length}</p>
        <p>技能数：{store.getSkills().length}</p>
      </div>
    );
  } catch(e) {
    return <div style={{padding:40,color:'red'}}>
      <h2>Store Error</h2>
      <pre>{e.message}{'\n'}{e.stack}</pre>
    </div>;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TestComp />} />
      </Routes>
    </BrowserRouter>
  );
}
