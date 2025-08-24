import CustomerForm from "@/components/CustomerForm";
import SearchForm from "@/components/SearchForm";
import { db } from "@/lib/db";

export default function DashboardPage() {
  const customers = db.customers.slice(0, 10);
  const searches = db.searches.slice(0, 10);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-2">Add Customer</h2>
        <CustomerForm />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Quick Search</h2>
        <SearchForm
          customers={customers.map((c) => ({ id: c.id, name: c.name, email: c.email }))}
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Customers</h2>
        {customers.length === 0 ? (
          <p className="text-sm text-gray-500">No customers yet.</p>
        ) : (
          <ul className="list-disc pl-4">
            {customers.map((c) => (
              <li key={c.id}>
                {c.name} - {c.email}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Searches</h2>
        {searches.length === 0 ? (
          <p className="text-sm text-gray-500">No searches yet.</p>
        ) : (
          <ul className="list-disc pl-4">
            {searches.map((s) => (
              <li key={s.id}>
                {s.origin} → {s.destination} ({s.status})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
