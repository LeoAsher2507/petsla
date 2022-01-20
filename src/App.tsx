import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'src/navigation/PrivateRoute';
import { ERouterPath } from 'src/navigation/route';
import HomePage from './pages/HomePage';
import Footer from './partials/Footer';
import TopNav from './partials/TopNav';
import { RootState, useAppSelector } from './store/rootReducer';

function App() {
  const style = useAppSelector((state: RootState) => state.theme.style);

  return (
    <BrowserRouter>
      <div
        className='app'
        style={{ backgroundColor: style.backgroundColor, color: style.color }}
      >
        <TopNav />
        <Routes>
          <Route path={ERouterPath.HOME} element={<PrivateRoute />}>
            <Route path={ERouterPath.ACCOUNT} element={<h3>Account</h3>} />
          </Route>


          <Route path={ERouterPath.HOME} element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
