import { http } from './httpClient';
import type { Customer, CustomerFilter, CustomerRequest } from '../types/customer';
import type { BirthIndicators } from '../types/indicator';

const RESOURCE = '/api/customers';

export function buildSearchPath(filter: CustomerFilter = {}): string {
  const params = new URLSearchParams();
  const dni = filter.dni?.trim();
  const email = filter.email?.trim();
  if (dni) params.set('dni', dni);
  if (email) params.set('email', email);
  const query = params.toString();
  return query ? `${RESOURCE}?${query}` : RESOURCE;
}

export const customersApi = {
  find: (filter?: CustomerFilter) => http<Customer[]>(buildSearchPath(filter)),
  create: (customer: CustomerRequest) =>
    http<Customer>(RESOURCE, { method: 'POST', body: JSON.stringify(customer) }),
  getIndicators: () => http<BirthIndicators>(`${RESOURCE}/indicators`),
};
