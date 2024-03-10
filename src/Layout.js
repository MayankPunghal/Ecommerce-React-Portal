import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import ProfileDataPopup from './HelperComponents/ProfileDataPopup';
import SessionUtil from './UtilComponent/SessionUtil';

const Layout = ({ children }) => {
  const location = useLocation();
  const loggedInUser = JSON.parse(localStorage.getItem('userData'));
  const [showPopup, setShowPopup] = React.useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const shouldshowPopup = loggedInUser && !['/', '/home'].includes(location.pathname);

  return (

    <div style={{ position: 'relative', zIndex: 1 }}>
      <SessionUtil timeoutInMinutes={5} />
      {shouldshowPopup && (
        <div>
          <div className="fixed top-0 left-0 p-4 w-36 h-auto z-20">
            <img src="/EcomDemoIconPng.png" className=""/>
          </div>
        <div className="fixed top-0 right-0 p-4 h-14 w-full backdrop-blur-sm z-10 brightness-90">
          <ProfileDataPopup togglePopup={togglePopup} showPopup={showPopup} user={loggedInUser} />
        </div>
        </div>
      )}
      <div className="mt-10">
      {children}
      <Outlet />
      </div>
    </div>
  );
};

export default Layout;
