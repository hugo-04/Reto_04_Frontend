import { useCallback, useEffect, useState } from 'react';
import { customersApi } from '../../../api/customersApi';
import type { BirthIndicators } from '../../../types/indicator';

export function useIndicators() {
  const [indicators, setIndicators] = useState<BirthIndicators | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setIndicators(await customersApi.getIndicators());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { indicators, loading, error, reload: load };
}
