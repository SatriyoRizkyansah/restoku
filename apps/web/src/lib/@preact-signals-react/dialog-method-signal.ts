import { dialog_signal, type DialogSignalType } from "./dialog-init-signal";

export type OpenDialogProps = {
  /**
   * Optional: Size bisa dipakai untuk className di Shadcn atau Tailwind (misalnya `max-w-xl`)
   */
  size?: string;
  fullscreen?: boolean;
} & DialogSignalType;

export function show_dialog({ render_component, size = "max-w-xl", fullscreen = false, should_disabled_clickaway_close = false, should_close_for_one_clickaway = false, dialog_props = {} }: OpenDialogProps) {
  dialog_signal.value = {
    ...dialog_signal.value,
    open: true,
    render_component,
    dialog_props: {
      size,
      fullscreen,
      ...dialog_props,
    },
    should_disabled_clickaway_close,
    should_close_for_one_clickaway,
  };
}

export function close_dialog() {
  dialog_signal.value = {
    ...dialog_signal.value,
    open: false,
    render_component: null,
  };
}
