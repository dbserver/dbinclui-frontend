import React, { useState } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

export interface NotificationProps {
  variant: 'error' | 'success';
  message: string;
  onClose?: Function;
  title?: string;
  children?: React.ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({
  variant,
  message,
  title,
  onClose,
}): JSX.Element => {
  const [shouldOpen, setShouldOpen] = useState(true);

  const handleClose = () => {
    setShouldOpen(false);
    onClose && onClose();
  };

  const getNotificationTitle = (title: string | undefined) => {
    if (!title) {
      return variant === 'error' ? 'Erro' : 'Sucesso';
    }
    return title;
  };

  const notificationTitle = getNotificationTitle(title);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={shouldOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{ width: '35rem' }}
    >
      <Alert
        variant="filled"
        severity={variant}
        onClose={handleClose}
        sx={{ width: '100%' }}
        closeText="Fechar"
      >
        <AlertTitle title={`Título da Notificação:${notificationTitle}`}>
          {notificationTitle}
        </AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
