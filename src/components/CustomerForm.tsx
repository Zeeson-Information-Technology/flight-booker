'use client';
import { useState } from 'react';
import Toast from './Toast';

type Props = {
  onCreated?: (customer: any) => void;
};

export default function CustomerForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone) {
      setToast({ message: 'All fields required', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'agent@example.com',
        },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (data.ok) {
        setToast({ message: 'Customer added', type: 'success' });
        setName('');
        setEmail('');
        setPhone('');
        onCreated?.(data.customer);
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
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <form onSubmit={handleSubmit} className="space-y-2">
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
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
}
