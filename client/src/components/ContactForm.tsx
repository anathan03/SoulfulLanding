import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const ContactFormPopup = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mrbkrder", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Stay in Touch
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">Join Our Email List</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium">
              Your email:
              <input type="email" name="email" required className="w-full mt-1 p-2 border rounded" />
            </label>
            <label className="block mb-4 text-sm font-medium">
              Your message:
              <textarea name="message" required className="w-full mt-1 p-2 border rounded" />
            </label>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Send
            </button>
            {status === "success" && <p className="text-green-600 mt-2">Thanks! Your message was sent.</p>}
            {status === "error" && <p className="text-red-600 mt-2">Oops! Something went wrong.</p>}
          </form>
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContactFormPopup;
