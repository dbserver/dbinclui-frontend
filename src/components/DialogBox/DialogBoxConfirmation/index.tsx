import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import styles from './styles';
import AccessibilityTypography from '@components/AccessibilityTypography';

export interface ConfirmationProps {
  onClose?: Function;
  title?: string;
  confirmation: boolean;
  setConfirmation: Function;
}

export const DialogBoxConfirmation: React.FC<ConfirmationProps> = (
  props: ConfirmationProps,
): JSX.Element => {
  const handleClose = () => {
    props.onClose && props.onClose(false, props.setConfirmation(false));
  };

  const handleOk = () => {
    props.onClose && props.onClose(true, props.setConfirmation(false));
  };

  return (
    <Box sx={styles.boxDialog}>
      <Dialog
        open={props.confirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="dialog"
      >
        <AccessibilityTypography role="message" tabIndex={1}>
          <DialogTitle id="alert-dialog-title" sx={styles.listTitle}>
            {'Mensagem de Exclusão'}
          </DialogTitle>
        </AccessibilityTypography>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={styles.listTitle}
          >
            <AccessibilityTypography role="message" tabIndex={1}>
              {props.title}
            </AccessibilityTypography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box sx={styles.boxButton}>
            <Button
              variant="contained"
              sx={styles.button}
              data-testid="sim"
              onClick={handleOk}
            >
              Sim
            </Button>
            {/*  */}
            <Button
              data-testid="nao"
              sx={styles.button}
              variant="contained"
              onClick={handleClose}
            >
              Não
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DialogBoxConfirmation;
