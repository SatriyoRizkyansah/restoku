import { doubleClickAction } from "@/utils/double-click";
import { dialog_signal } from "./dialog-init-signal";
import { close_dialog } from "./dialog-method-signal";
import { show_toast } from "./toas_signal";

export default function PreactSignalDialog() {
  const { open, render_component, should_disabled_clickaway_close, should_close_for_one_clickaway } = dialog_signal.value;

  const handleClose = () => {
    if (should_disabled_clickaway_close) return;

    if (should_close_for_one_clickaway) {
      close_dialog();
    } else {
      doubleClickAction(
        () => {
          show_toast({
            severity: "error",
            message: "Double klik untuk menutup dialog",
            position: "bottom-center",
          });
        },
        () => {
          close_dialog();
        }
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        {render_component || null}
      </div>
    </div>
  );
}
