"use client";

import { Customer } from "@/lib/db";
import CustomerForm from "@/components/CustomerForm";
import { useState } from "react";

export default function CustomersClient({ initial }: { initial: Customer[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = initial.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          placeholder="Search"
          className="border p-2 rounded w-full max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => setOpen(true)}
          className="ml-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No customers.</p>
      ) : (
        <ul className="divide-y">
          {filtered.map((c) => (
            <li key={c.id} className="py-2">
              {c.name} - {c.email}
            </li>
          ))}
        </ul>
      )}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow max-w-sm w-full relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2"
            >
              ✕
            </button>
            <CustomerForm />
          </div>
        </div>
      )}
    </div>
  );
}
