'use client';
import { useState } from 'react';
import Toast from './Toast';

type Customer = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  customers: Customer[];
};

export default function SearchForm({ customers }: Props) {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [earliestDate, setEarliestDate] = useState('');
  const [latestDate, setLatestDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState('ECONOMY');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerId || !origin || !destination || !earliestDate || !latestDate) {
      setToast({ message: 'All fields required', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'agent@example.com',
        },
        body: JSON.stringify({
          customer: customerId,
          origin,
          destination,
          earliestDate,
          latestDate,
          passengers,
          cabin,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setToast({ message: 'Search saved', type: 'success' });
        setResult(data);
      } else {
        setToast({ message: data.error || 'Error', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Network error', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit} className="space-y-2">
        <select
          className="w-full border p-2 rounded"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.email})
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            className="w-full border p-2 rounded"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={earliestDate}
            onChange={(e) => setEarliestDate(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={latestDate}
            onChange={(e) => setLatestDate(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-full border p-2 rounded"
            min={1}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
          />
          <select
            className="w-full border p-2 rounded"
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
          >
            <option value="ECONOMY">ECONOMY</option>
            <option value="PREMIUM_ECONOMY">PREMIUM_ECONOMY</option>
            <option value="BUSINESS">BUSINESS</option>
            <option value="FIRST">FIRST</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Run Search'}
        </button>
      </form>
      {result && (
        <pre className="mt-4 bg-gray-100 p-2 text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
