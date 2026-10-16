import { useState } from 'react';
import { Header, type NavItem } from './components/layout/Header';
import { CreateCustomerPage } from './pages/CreateCustomerPage';
import { CustomersPage } from './pages/CustomersPage';
import { IndicatorsPage } from './pages/IndicatorsPage';

type Page = 'customers' | 'create' | 'indicators';

const NAV_ITEMS: NavItem<Page>[] = [
  { id: 'customers', label: 'Clientes' },
  { id: 'create', label: 'Nuevo cliente' },
  { id: 'indicators', label: 'Indicadores' },
];

const PAGES: Record<Page, () => React.JSX.Element> = {
  customers: CustomersPage,
  create: CreateCustomerPage,
  indicators: IndicatorsPage,
};

export default function App() {
  const [page, setPage] = useState<Page>('customers');
  const CurrentPage = PAGES[page];

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <Header items={NAV_ITEMS} active={page} onChange={setPage} />
        <main className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <CurrentPage />
        </main>
      </div>
    </div>
  );
}
