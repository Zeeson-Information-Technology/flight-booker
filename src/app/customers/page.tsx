import { db } from "@/lib/db";
import CustomersClient from "./CustomersClient";

export default function CustomersPage() {
  const customers = db.customers.slice(0, 20);
  return <CustomersClient initial={customers} />;
}
