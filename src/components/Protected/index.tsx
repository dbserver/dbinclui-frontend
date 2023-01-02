import { AuthContext } from '@contexts/AuthContext';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const Protected = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.log('teste');
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
