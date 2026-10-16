import { useState } from 'react';
import { customersApi } from '../../../api/customersApi';
import { ApiError } from '../../../api/httpClient';
import type { Customer, CustomerRequest } from '../../../types/customer';

export interface CreateCustomerError {
  message: string;
  details: string[];
}

export function useCreateCustomer() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<CreateCustomerError | null>(null);

  const create = async (data: CustomerRequest): Promise<Customer | null> => {
    setSaving(true);
    setError(null);
    try {
      return await customersApi.create(data);
    } catch (e) {
      setError({ message: (e as Error).message, details: e instanceof ApiError ? e.details : [] });
      return null;
    } finally {
      setSaving(false);
    }
  };

  return { create, saving, error };
}
