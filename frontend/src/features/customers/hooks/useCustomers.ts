import { useCallback, useEffect, useState } from 'react';
import { customersApi } from '../../../api/customersApi';
import type { Customer, CustomerFilter } from '../../../types/customer';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (filter: CustomerFilter = {}) => {
    setLoading(true);
    setError(null);
    try {
      setCustomers(await customersApi.find(filter));
    } catch (e) {
      setCustomers([]);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void search();
  }, [search]);

  return { customers, loading, error, search };
}
