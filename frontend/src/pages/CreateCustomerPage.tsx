import { CustomerForm } from '../features/customers/components/CustomerForm';

export function CreateCustomerPage() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Nuevo cliente</h2>
      <CustomerForm />
    </section>
  );
}
