import React, {useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ImageUtil from '../UtilComponent/ImageUtil'; 

// New component for avatar initials
const AvatarInitials = ({ initials }) => (
  <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2">
    {initials}
  </div>
);

const ProfileDataPopup = ({ togglePopup, showPopup, user }) => {
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('expirationInMinutes');
    localStorage.removeItem('tokenExpirationTime');

    // Navigate to the Login page
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Clicked outside the popup, close it
        togglePopup();
      }
    };

    // Add event listener when the popup is shown
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove event listener when the component unmounts or the popup is hidden
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup, togglePopup]);

  // Function to get initials from user's name
  const getInitials = (name) => {
    const nameArray = name.split(' ');
    // Take the first two words and get initials
    const initials = nameArray.slice(0, 2).map((word) => word[0]).join('').toUpperCase();
    return initials;
  };
  const getUserName = (name) => {
    const nameArray = name.split(' ');
    const userName = nameArray.slice(0, 2).join(' ');
    return userName;
  }

  return (
    <div ref={popupRef} className="">
      <div className="flex items-center justify-end cursor-pointer" onClick={togglePopup}>
        {/* Display avatar initials if no profile image */}
        {user.imageName ? (
          <div className={`flex items-center justify-center h-8 w-8 rouded-full mr-2 object-cover`}>
          <ImageUtil imageName={user.imageName}/>
      </div>
        ) : (
          <AvatarInitials initials={getInitials(user.userName)} />
        )}
        <p className="text-gray-800 font-semibold">
          Welcome, {getUserName(user.userName)} !
        </p>
        <svg
          className={`ml-2 h-5 w-4 transition-transform ${showPopup ? 'transform rotate-180' : ''
            }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {showPopup && (
        <div className="top-15 right-1 bg-white border shadow-md rounded-md fixed mt-3">
          {/* Add some styling here */}
          <p className="text-gray-800 rounded-t-md p-4 border-b-2">
              {/* <AvatarInitials initials={getInitials(user.userName)}/> */}
              {getUserName(user.firstName + " " + user.lastName)}
          </p>
          <p className="text-gray-800 rounded-t-md p-4 border-b-2">{user.userEmail}</p>
          <p className="text-gray-800 rounded-t-md p-4 border-b-2">User Role : {user.roleName}</p>
          {/* Add more user information as needed */}
          <p className="text-gray-600 hover:bg-blue-500 hover:text-white p-4 border-b-2" onClick={handleLogout}>
            <button className="cursor-pointer">
              Logout
            </button>
          </p>
          <p className="text-gray-600 p-2 bg-slate-100 rounded-b-md">
            Last Login: {moment(user.lastLogin).format('MMMM D, YYYY h:mm A')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileDataPopup;
