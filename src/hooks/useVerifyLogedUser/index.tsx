import { AuthContext } from '@contexts/AuthContext';
import { UserEntity } from '@interfaces/UserEntity';
import React, { useState, useContext } from 'react';
import firebaseInitialize from '../../firebase/config';
import firebase from 'firebase/compat/app';
import { createUser, getUserById, validateUserExists } from '@services/users';

export const useVerifyLogedUser = () => {
  const { auth } = firebaseInitialize();

  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const { setUser } = useContext(AuthContext);

  const getUser = async (currentUser: firebase.User | null) => {
    if (currentUser) {
      const token = await currentUser.getIdToken();

      const result = await validateUserExists(token);

      if (!result.data) {
        await createUser(token);
      }

      const response = await getUserById(token!);

      const userObj: UserEntity = {
        _id: response.data.data._id,
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
        email: currentUser.email,
        token: token,
        admin: response.data.data.admin,
      };

      setUser(userObj);
    }
  };

  const verifyLogedGoogleUser = () => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        await getUser(user);
        setLoadingUser(false);
      } else {
        setUser(null);
        setLoadingUser(false);
      }
    });
  };

  return { verifyLogedGoogleUser, loadingUser };
};

export default useVerifyLogedUser;
