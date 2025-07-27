import { type MenuProps, type PaperProps } from '@mui/material';
import { signal } from '@preact/signals-react';

export type MenuPopperSignalType = {
  open?: boolean;
  menu_props?: ExclusiveOmit<MenuProps, 'open'>;
  anchor_element?: any | null;
  render_element: any | null;
  only_paper?: boolean;
  only_paper_props?: PaperProps;
};

export const popper_signal = signal<MenuPopperSignalType>({
  open: false,
  render_element: null,
  menu_props: {},
  anchor_element: null,
  only_paper: false,
  only_paper_props: {},
});
