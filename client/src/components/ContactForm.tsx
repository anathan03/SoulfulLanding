import React, { useState } from "react";

const ContactForm = () => {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
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
  );
};

export default ContactForm;
