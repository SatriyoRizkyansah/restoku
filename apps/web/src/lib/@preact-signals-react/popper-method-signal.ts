import { popper_signal, type MenuPopperSignalType } from './popper-init-signal';

export function open_popper({
  open = true,
  anchor_element,
  render_element,
  only_paper: usePopper,
  only_paper_props: usePopperPaperProps,
  menu_props,
}: MenuPopperSignalType) {
  popper_signal.value = {
    ...popper_signal.value,
    open,
    render_element,
    menu_props,
    anchor_element,
    only_paper: usePopper,
    only_paper_props: usePopperPaperProps,
  };
}

export function close_popper() {
  popper_signal.value = { ...popper_signal.value, open: false };
}
