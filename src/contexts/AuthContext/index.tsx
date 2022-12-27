import React, { createContext, PropsWithChildren, useState } from 'react';
import { UserEntity } from '@interfaces/UserEntity';

interface AuthContextProps {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
}

const initialValue: AuthContextProps = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>(initialValue);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<UserEntity | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
