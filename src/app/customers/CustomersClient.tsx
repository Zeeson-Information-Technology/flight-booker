'use client';
import { useState } from 'react';
import CustomerForm from '@/components/CustomerForm';

type Customer = { id: string; name: string; email: string; phone: string };

type Props = {
  initial: Customer[];
};

export default function CustomersClient({ initial }: Props) {
  const [customers, setCustomers] = useState(initial);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          className="border p-2 rounded flex-1 mr-2"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Customer
        </button>
      </div>
      {current.length ? (
        <ul className="space-y-2">
          {current.map((c) => (
            <li key={c.id} className="border p-2 rounded">
              {c.name} - {c.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers</p>
      )}
      {totalPages > 1 && (
        <div className="mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`px-3 py-1 border ${
                n === page ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <CustomerForm
              onCreated={(c) => {
                setCustomers([c, ...customers]);
                setShowForm(false);
              }}
            />
            <button
              className="mt-2 text-sm text-gray-500"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
