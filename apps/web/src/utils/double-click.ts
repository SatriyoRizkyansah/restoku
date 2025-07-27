import { signal } from "@preact/signals-react";

const clickCount = signal(0);
let clickTimeout: NodeJS.Timeout;

export function doubleClickAction(onSingleClick: () => void, onDoubleClick: () => void, timeOut: number = 200) {
  if (clickCount.value === 0) {
    clickCount.value++;
    clickTimeout = setTimeout(() => {
      onSingleClick();
      clickCount.value = 0;
    }, timeOut);
  } else if (clickCount.value === 1) {
    clearTimeout(clickTimeout);
    onDoubleClick();
    clickCount.value = 0;
  }
}
