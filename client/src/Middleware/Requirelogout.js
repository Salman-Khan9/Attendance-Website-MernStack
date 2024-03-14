import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectloggedstatus } from '../Redux/Slices/AuthSlice';

const RequireLoggedOut = ({ children }) => {
  const isLoggedIn = useSelector(selectloggedstatus);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RequireLoggedOut;