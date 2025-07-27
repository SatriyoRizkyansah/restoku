import { Dialog, Zoom } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { dialog_signal } from './dialog-init-signal';
import { type TransitionProps } from '@mui/material/transitions';
import { close_dialog } from './dialog-method-signal';
import { doubleClickAction } from 'src/utils/double-click';
import { show_toast } from './toas_signal';

const transition_component = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom timeout={100} ref={ref} {...props} />;
});

export default function PreactSignalDialog() {
  return useMemo(() => {
    const handleClose = (_event: any, reason?: string) => {
      if (reason === 'escapeKeyDown') return;

      if (dialog_signal.value.should_disabled_clickaway_close) return;

      if (dialog_signal.value.should_close_for_one_clickaway) {
        close_dialog();
      } else {
        doubleClickAction(
          () => {
            show_toast({
              severity: 'error',
              message: 'Double klik untuk menutup dialog',
              position: 'bottom-center',
            });
          },
          () => {
            close_dialog();
          }
        );
      }
    };

    return (
      <Dialog
        id="PreactSignalDialog"
        key={'PreactSignalDialog'}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            close_dialog();
          }
        }}
        onClose={handleClose}
        TransitionComponent={transition_component}
        scroll="body"
        {...dialog_signal.value.dialog_props}
        open={Boolean(dialog_signal.value.open)}
      >
        {dialog_signal.value.render_component || <></>}
      </Dialog>
    );
  }, [dialog_signal.value]);
}
