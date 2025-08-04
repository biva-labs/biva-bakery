import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="md:hidden p-4 text-white hover:cursor-pointer">☰</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 md:hidden" />

        <Dialog.Content
          className={`
            fixed DialogContent inset-y-0 left-0 w-64 bg-white shadow-xl z-50
            transform transition-transform duration-200
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:hidden
          `}
        >
          <Dialog.Close className="p-4 hover:cursor-pointer">Close</Dialog.Close>
          <nav className="mt-4 space-y-2">
            <a href="#" className="block px-4 py-2">
              Hotel
            </a>
            <a href="#" className="block px-4 py-2">
              Food Court
            </a>
            <a href="#" className="block px-4 py-2">
              Bakery
            </a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
