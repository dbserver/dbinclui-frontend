import { AuthContext } from '@contexts/AuthContext';
import React, { useContext, useState } from 'react';
import Notification from '@components/Notification';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const Protected = ({ children }: Props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);

  // if(!user){
  //   return(
  //     {error && (
  //       <Notification
  //       message="Testando"
  //       variant="error"
  //       onClose={() => {
  //         setError(false);
  //         setErrorMessage('');
  //       }}
  //     />
  //     )}
  //   )
  // }

  return <>{children}</>;
};
