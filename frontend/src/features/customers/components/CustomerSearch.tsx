import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { CustomerFilter } from '../../../types/customer';

interface CustomerSearchProps {
  onSearch: (filter: CustomerFilter) => void;
  loading: boolean;
}

export function CustomerSearch({ onSearch, loading }: CustomerSearchProps) {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch({ dni, email });
  };

  const handleClear = () => {
    setDni('');
    setEmail('');
    onSearch({});
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="mb-4 grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <Input
        label="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="12345678"
        inputMode="numeric"
        maxLength={8}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ana.perez@mail.com"
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          Buscar
        </Button>
        <Button variant="secondary" onClick={handleClear} disabled={loading}>
          Limpiar
        </Button>
      </div>
    </form>
  );
}
