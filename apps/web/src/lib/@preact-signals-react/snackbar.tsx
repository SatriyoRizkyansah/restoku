import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Box } from '@mui/material';
import { alert_signal } from './snackbar_signal';

export function AlertSnackbar() {
  const handleClose = () => {
    alert_signal.value = {
      ...alert_signal.value,
      open: false,
    };
  };

  return React.useMemo(() => {
    // console.log('sdfdf');
    return (
      <Snackbar
        open={alert_signal.value.open}
        autoHideDuration={alert_signal.value.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={alert_signal.value.anchorOrigin}
      >
        <Box>
          <Alert
            onClose={handleClose}
            severity={alert_signal.value.severity}
            variant={alert_signal.value.variant}
          >
            {alert_signal.value.message}
          </Alert>
        </Box>
      </Snackbar>
    );
  }, [alert_signal.value]);
}
