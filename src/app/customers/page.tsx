import { connect } from '@/lib/db';
import { Customer } from '@/models/Customer';
import CustomersClient from './CustomersClient';

export default async function CustomersPage() {
  await connect();
  const customers = await Customer.find().sort({ createdAt: -1 }).lean();
  const list = customers.map((c: any) => ({
    id: c._id.toString(),
    name: c.name,
    email: c.email,
    phone: c.phone,
  }));
  return <CustomersClient initial={list} />;
}
