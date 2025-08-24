"use client";

import { FormEvent, useState } from "react";
import { useToast } from "./Toast";

interface CustomerOption {
  id: string;
  name: string;
  email: string;
}

interface Props {
  customers: CustomerOption[];
}

export default function SearchForm({ customers }: Props) {
  const { show } = useToast();
  const [customerId, setCustomerId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [earliestDate, setEarliestDate] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("ECONOMY");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customerId || !origin || !destination || !earliestDate || !latestDate) {
      show("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": "agent@example.com",
        },
        body: JSON.stringify({
          customerId,
          origin,
          destination,
          earliestDate,
          latestDate,
          passengers,
          cabin,
        }),
      });
      const data = await res.json();
      setResponse(data);
      if (data.ok) {
        show("Search saved");
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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
        <select
          className="w-full border p-2 rounded"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.email})
            </option>
          ))}
        </select>
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
        <input
          className="w-full border p-2 rounded"
          type="date"
          value={earliestDate}
          onChange={(e) => setEarliestDate(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="date"
          value={latestDate}
          onChange={(e) => setLatestDate(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          min={1}
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
        />
        <select
          className="w-full border p-2 rounded"
          value={cabin}
          onChange={(e) => setCabin(e.target.value)}
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Searching..." : "Run Search"}
        </button>
      </form>
      {response && (
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}
