import { connect } from '@/lib/db';
import { Customer } from '@/models/Customer';
import { SearchRequest } from '@/models/SearchRequest';
import CustomerForm from '@/components/CustomerForm';
import SearchForm from '@/components/SearchForm';

export default async function DashboardPage() {
  await connect();
  const customers = await Customer.find().sort({ name: 1 }).lean();
  const recentCustomers = await Customer.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  const recentSearches = await SearchRequest.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('customer')
    .lean();

  const customerOpts = customers.map((c: any) => ({
    id: c._id.toString(),
    name: c.name,
    email: c.email,
  }));

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-semibold text-lg mb-2">Add Customer</h2>
        <CustomerForm />
      </section>
      <section>
        <h2 className="font-semibold text-lg mb-2">Quick Search</h2>
        <SearchForm customers={customerOpts} />
      </section>
      <section>
        <h2 className="font-semibold text-lg mb-2">Recent Customers</h2>
        {recentCustomers.length ? (
          <ul className="list-disc ml-5">
            {recentCustomers.map((c: any) => (
              <li key={c._id.toString()}>
                {c.name} - {c.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No customers</p>
        )}
      </section>
      <section>
        <h2 className="font-semibold text-lg mb-2">Recent Searches</h2>
        {recentSearches.length ? (
          <ul className="list-disc ml-5">
            {recentSearches.map((s: any) => (
              <li key={s._id.toString()}>
                {s.customer?.name || 'Unknown'}: {s.origin} → {s.destination}
              </li>
            ))}
          </ul>
        ) : (
          <p>No searches</p>
        )}
      </section>
    </div>
  );
}
