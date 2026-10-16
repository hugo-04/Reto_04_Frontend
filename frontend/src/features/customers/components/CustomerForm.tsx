import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Alert } from '../../../components/ui/Alert';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { Customer, CustomerRequest } from '../../../types/customer';
import { today } from '../../../utils/date';
import { useCreateCustomer } from '../hooks/useCreateCustomer';
import { normalizeCustomer, validateCustomer, type CustomerFormErrors } from '../utils/validation';

const EMPTY_FORM: CustomerRequest = { firstName: '', lastName: '', email: '', dni: '', birthDate: '' };

interface CustomerFormProps {
  onCreated?: (customer: Customer) => void;
}

export function CustomerForm({ onCreated }: CustomerFormProps) {
  const [form, setForm] = useState<CustomerRequest>(EMPTY_FORM);
  const [errors, setErrors] = useState<CustomerFormErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const { create, saving, error } = useCreateCustomer();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccess(null);

    const validation = validateCustomer(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const created = await create(normalizeCustomer(form));
    if (created) {
      setForm(EMPTY_FORM);
      setSuccess(`Cliente ${created.firstName} ${created.lastName} creado con ID ${created.id}.`);
      onCreated?.(created);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <Input label="Nombre" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} maxLength={100} />
        <Input label="Apellido" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} maxLength={100} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} maxLength={150} />
        <Input label="DNI" name="dni" inputMode="numeric" value={form.dni} onChange={handleChange} error={errors.dni} maxLength={8} />
        <Input
          label="Fecha de nacimiento"
          name="birthDate"
          type="date"
          max={today()}
          value={form.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
        />
        <div className="sm:col-span-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando...' : 'Crear cliente'}
          </Button>
        </div>
      </form>

      {success && <Alert type="success">{success}</Alert>}
      {error && (
        <Alert type="error">
          <p>{error.message}</p>
          {error.details.length > 0 && (
            <ul className="mt-1 list-disc pl-5">
              {error.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}
    </>
  );
}
