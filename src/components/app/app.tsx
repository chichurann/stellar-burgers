import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import ProtectedRoute from '../protected-route/protected-route';

import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <Router>
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* Основные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Защищенные маршруты */}
        <Route
          path='/profile'
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={ProfileOrders} />}
        />

        {/* Модалки */}
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>
    </div>
  </Router>
);

export default App;
