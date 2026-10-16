import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { CustomerFilter } from '../../../types/customer';
import {
  DNI_LENGTH,
  EMAIL_MAX_LENGTH,
  onlyDigits,
  validateFilter,
  type CustomerFilterErrors,
} from '../utils/validation';

interface CustomerSearchProps {
  onSearch: (filter: CustomerFilter) => void;
  loading: boolean;
}

export function CustomerSearch({ onSearch, loading }: CustomerSearchProps) {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<CustomerFilterErrors>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const filter = { dni: dni.trim(), email: email.trim() };
    const validation = validateFilter(filter);
    setErrors(validation);
    if (Object.keys(validation).length === 0) onSearch(filter);
  };

  const handleClear = () => {
    setDni('');
    setEmail('');
    setErrors({});
    onSearch({});
  };

  return (
    <form role="search" noValidate onSubmit={handleSubmit} className="mb-4 grid items-start gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <Input
        label="DNI"
        value={dni}
        onChange={(e) => {
          setDni(onlyDigits(e.target.value));
          setErrors((prev) => ({ ...prev, dni: undefined }));
        }}
        error={errors.dni}
        placeholder="12345678"
        inputMode="numeric"
        maxLength={DNI_LENGTH}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        placeholder="ana.perez@mail.com"
        maxLength={EMAIL_MAX_LENGTH}
      />
      <div className="flex gap-2 sm:mt-6">
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
