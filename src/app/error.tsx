'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4">
      <h2 className="text-red-600 font-semibold mb-2">Something went wrong!</h2>
      <p className="mb-2">{error.message}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
