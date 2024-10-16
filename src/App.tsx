import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import MainPage from './pages/main-page/main-page';
import UserProfilePage from './pages/user-profile-page/user-profile-page';
import { useEffect } from 'react';
import { useAppDispatch } from './store/redux/hooks';
import { fetchUers } from './store/redux/slices/users';
import NotFoundPage from './pages/not-found-page/not-found-page';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUers());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
