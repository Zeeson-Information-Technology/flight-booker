'use client';
import { useState } from 'react';

type Search = {
  id: string;
  customer?: { name: string };
  origin: string;
  destination: string;
  earliestDate: string;
  latestDate: string;
  passengers: number;
  cabin: string;
  status: string;
  createdAt: string;
};

type Props = {
  initial: Search[];
};

export default function SearchesClient({ initial }: Props) {
  const [selected, setSelected] = useState<Search | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4">
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
          {initial.length ? (
            initial.map((s) => (
              <tr
                key={s.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelected(s)}
              >
                <td className="p-2 border">{s.customer?.name || 'Unknown'}</td>
                <td className="p-2 border">
                  {s.origin} → {s.destination}
                </td>
                <td className="p-2 border">
                  {s.earliestDate} - {s.latestDate}
                </td>
                <td className="p-2 border">{s.passengers}</td>
                <td className="p-2 border">{s.cabin}</td>
                <td className="p-2 border">{s.status}</td>
                <td className="p-2 border">
                  {new Date(s.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2" colSpan={7}>
                No searches
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selected && (
        <div className="md:w-1/2 border p-4">
          <h3 className="font-semibold mb-2">Details</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(selected, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
