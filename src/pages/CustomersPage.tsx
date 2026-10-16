import { Alert } from '../components/ui/Alert';
import { Spinner } from '../components/ui/Spinner';
import { CustomerSearch } from '../features/customers/components/CustomerSearch';
import { CustomerTable } from '../features/customers/components/CustomerTable';
import { useCustomers } from '../features/customers/hooks/useCustomers';

export function CustomersPage() {
  const { customers, loading, error, search } = useCustomers();

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Clientes</h2>
      <CustomerSearch onSearch={search} loading={loading} />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? <Spinner /> : !error && <CustomerTable customers={customers} />}
    </section>
  );
}
