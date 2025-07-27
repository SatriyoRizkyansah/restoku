import { signal } from "@preact/signals-react";
import { toast, type ToastOptions, Bounce, Zoom, Slide, Flip } from "react-toastify";

export type ToOptional<T> = { [P in keyof T]?: T[P] };

export type AlertSignalType = {
  severity: "success" | "error" | "warning" | "info";
  message: string;
  position: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
  autoClose: number;
  hideProgressBar: boolean;
  theme: "colored" | "light" | "dark";
  transition?: typeof Bounce | typeof Zoom | typeof Slide | typeof Flip;
};

export const toast_signal = signal<AlertSignalType>({
  severity: "info",
  message: "",
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  theme: "colored",
  transition: Bounce,
});

// Fungsi untuk menampilkan toast
export function show_toast(props: ToOptional<AlertSignalType>) {
  toast_signal.value = { ...toast_signal.value, ...props };

  const options: ToastOptions = {
    position: toast_signal.value.position,
    autoClose: toast_signal.value.autoClose,
    hideProgressBar: toast_signal.value.hideProgressBar,
    theme: toast_signal.value.theme,
  };

  switch (toast_signal.value.severity) {
    case "success":
      toast.success(toast_signal.value.message, options);
      break;
    case "error":
      toast.error(toast_signal.value.message, options);
      break;
    case "warning":
      toast.warn(toast_signal.value.message, options);
      break;
    default:
      toast.info(toast_signal.value.message, options);
      break;
  }
}
