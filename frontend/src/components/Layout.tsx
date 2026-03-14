import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SOSButton from './SOSButton';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="container main-content">
        <Outlet />
      </main>
      <SOSButton />
    </div>
  );
};

export default Layout;
