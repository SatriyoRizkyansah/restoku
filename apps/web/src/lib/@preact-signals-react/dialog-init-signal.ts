import { signal } from "@preact/signals-react";
import type { ReactNode } from "react";

// Buat type props custom untuk dialog agar tidak tergantung pada MUI
export type CustomDialogProps = {
  className?: string;
  size?: string; // misal: 'max-w-xl'
  fullscreen?: boolean;
  [key: string]: any;
};

export type DialogSignalType = {
  dialog_props?: CustomDialogProps;
  open?: boolean;
  should_close_for_one_clickaway?: boolean;
  should_disabled_clickaway_close?: boolean;
  render_component?: ReactNode;
};

export const dialog_signal = signal<DialogSignalType>({
  open: false,
  dialog_props: {},
  should_disabled_clickaway_close: false,
  should_close_for_one_clickaway: false,
  render_component: undefined,
});
