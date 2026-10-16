import { cn } from '../../utils/cn';

export interface NavItem<T extends string> {
  id: T;
  label: string;
}

interface HeaderProps<T extends string> {
  items: NavItem<T>[];
  active: T;
  onChange: (id: T) => void;
}

export function Header<T extends string>({ items, active, onChange }: HeaderProps<T>) {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      <nav className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={active === item.id ? 'page' : undefined}
            onClick={() => onChange(item.id)}
            className={cn(
              'rounded-md border border-blue-600 px-4 py-2 text-sm font-medium transition-colors',
              active === item.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50',
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
