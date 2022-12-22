import { useAuthContext } from '@contexts/AuthContext';
import React, { useState } from 'react';
import { auth } from '../../firebase/config';

export const useVerifyLogedUser = () => {
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const { setUser } = useAuthContext();

  const verifyLogedGoogleUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoadingUser(false);
      } else {
        setLoadingUser(false);
      }
    });
  };

  return { verifyLogedGoogleUser, loadingUser };
};

export default useVerifyLogedUser;
