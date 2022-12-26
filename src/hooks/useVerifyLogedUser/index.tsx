import { AuthContext } from '@contexts/AuthContext';
import React, { useState, useContext } from 'react';
import firebaseInitialize from '../../firebase/config';

export const useVerifyLogedUser = () => {
  const { auth } = firebaseInitialize();

  const { setUser } = useContext(AuthContext);

  const [loadingUser, setLoadingUser] = useState<boolean>(true);

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
