import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import StatsPage from './pages/StatsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/list" replace />} />
          <Route path="list" element={<ListPage />} />
          <Route path="item/:id" element={<ItemPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
