import { db } from "@/lib/db";
import SearchesClient from "./SearchesClient";

export default function SearchesPage() {
  const searches = db.searches.slice(0, 20).map((s) => ({
    ...s,
    customer: db.customers.find((c) => c.id === s.customerId),
  }));
  return <SearchesClient initial={searches} />;
}
