import { Box, ClickAwayListener, Grow, Menu, Paper, Popper } from '@mui/material';
import { isValidElement, useMemo } from 'react';
import { close_popper } from './popper-method-signal';
import { popper_signal } from './popper-init-signal';

export default function PreactSignalPopper() {
  return (
    useMemo(
      () =>
        popper_signal.value.only_paper ? (
          <Popper
            anchorEl={popper_signal.value.anchor_element}
            open={Boolean(popper_signal.value.open)}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: 9998 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper {...popper_signal.value.only_paper_props}>
                  <ClickAwayListener onClickAway={() => close_popper()}>
                    {isValidElement(popper_signal.value.render_element) ? (
                      popper_signal.value.render_element
                    ) : (
                      <Box></Box>
                    )}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : (
          <Menu
            id="basic-menu"
            anchorEl={popper_signal.value.anchor_element}
            open={Boolean(popper_signal.value.open)}
            onClose={() => close_popper()}
            BackdropProps={{ sx: { background: 'transparent' } }}
            slotProps={{
              paper: {
                style: {
                  maxHeight: 48 * 4.5,
                  marginLeft: 5,
                },
              },
            }}
            {...popper_signal.value.menu_props}
          >
            {popper_signal.value.render_element || undefined}
          </Menu>
        ),
      [popper_signal.value]
    ),
    [popper_signal.value]
  );
}
