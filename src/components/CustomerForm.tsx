"use client";

import { FormEvent, useState } from "react";
import { useToast } from "./Toast";

export default function CustomerForm() {
  const { show } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      show("Name and email are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": "agent@example.com",
        },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (data.ok) {
        show("Customer added");
        setName("");
        setEmail("");
        setPhone("");
      } else {
        show(data.error || "Error");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error";
      show(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-sm">
      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Customer"}
      </button>
    </form>
  );
}
