export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export type Search = {
  id: string;
  customerId: string;
  origin: string;
  destination: string;
  earliestDate: string;
  latestDate: string;
  passengers: number;
  cabin: string;
  status: string;
  createdAt: Date;
  query: Record<string, unknown>;
};

export const db = {
  customers: [] as Customer[],
  searches: [] as Search[],
};
