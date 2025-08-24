"use client";

import { Search, Customer } from "@/lib/db";
import { useState } from "react";

interface SearchWithCustomer extends Search {
  customer?: Customer;
}

export default function SearchesClient({ initial }: { initial: SearchWithCustomer[] }) {
  const [selected, setSelected] = useState<SearchWithCustomer | null>(null);

  return (
    <div className="space-y-4">
      {initial.length === 0 ? (
        <p className="text-sm text-gray-500">No searches.</p>
      ) : (
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Route</th>
              <th className="p-2 border">Dates</th>
              <th className="p-2 border">Pax</th>
              <th className="p-2 border">Cabin</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {initial.map((s) => (
              <tr
                key={s.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSelected(s)}
              >
                <td className="p-2 border">{s.customer?.name || s.customerId}</td>
                <td className="p-2 border">
                  {s.origin} → {s.destination}
                </td>
                <td className="p-2 border">
                  {s.earliestDate} – {s.latestDate}
                </td>
                <td className="p-2 border">{s.passengers}</td>
                <td className="p-2 border">{s.cabin}</td>
                <td className="p-2 border">{s.status}</td>
                <td className="p-2 border">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selected && (
        <div className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Search Details</h3>
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(selected.query, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
