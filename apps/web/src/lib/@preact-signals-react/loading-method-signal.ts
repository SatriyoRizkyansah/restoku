import { loading_overlay_signal } from 'src/lib/@preact-signals-react/loading-init-signal';

export function set_loading_to(type: boolean) {
  loading_overlay_signal.value = type;
}

export function show_loading() {
  set_loading_to(true);
}

export function close_loading() {
  set_loading_to(false);
}
