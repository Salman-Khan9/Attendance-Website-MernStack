import React from 'react';
import { useSelector } from 'react-redux';
import { selectloggedstatus } from '../../Redux/Slices/AuthSlice';
import { Navigate } from 'react-router-dom';

const RequireLoggedOut = ({ children }) => {
  const isLoggedIn = useSelector(selectloggedstatus);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RequireLoggedOut;