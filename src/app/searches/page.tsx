import { connect } from '@/lib/db';
import { SearchRequest } from '@/models/SearchRequest';
import SearchesClient from './SearchesClient';

export default async function SearchesPage() {
  await connect();
  const searches = await SearchRequest.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('customer')
    .lean();
  const list = searches.map((s: any) => ({
    id: s._id.toString(),
    customer: s.customer ? { name: s.customer.name } : undefined,
    origin: s.origin,
    destination: s.destination,
    earliestDate: s.earliestDate,
    latestDate: s.latestDate,
    passengers: s.passengers,
    cabin: s.cabin,
    status: s.status,
    createdAt: s.createdAt.toISOString(),
  }));
  return <SearchesClient initial={list} />;
}
