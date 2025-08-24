import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Flight Agent AI</h1>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/customers"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Customer
        </Link>
      </div>
    </div>
  );
}
