import type { CustomerRequest } from '../../../types/customer';
import { today } from '../../../utils/date';

export type CustomerFormErrors = Partial<Record<keyof CustomerRequest, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DNI_REGEX = /^\d{8}$/;

export function validateCustomer(data: CustomerRequest): CustomerFormErrors {
  const errors: CustomerFormErrors = {};
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.trim();
  const dni = data.dni.trim();

  if (!firstName) errors.firstName = 'El nombre es obligatorio';
  else if (firstName.length > 100) errors.firstName = 'El nombre no puede superar 100 caracteres';

  if (!lastName) errors.lastName = 'El apellido es obligatorio';
  else if (lastName.length > 100) errors.lastName = 'El apellido no puede superar 100 caracteres';

  if (!email) errors.email = 'El email es obligatorio';
  else if (!EMAIL_REGEX.test(email)) errors.email = 'El email no tiene un formato válido';
  else if (email.length > 150) errors.email = 'El email no puede superar 150 caracteres';

  if (!dni) errors.dni = 'El DNI es obligatorio';
  else if (!DNI_REGEX.test(dni)) errors.dni = 'El DNI debe tener exactamente 8 dígitos';

  if (!data.birthDate) errors.birthDate = 'La fecha de nacimiento es obligatoria';
  else if (data.birthDate >= today()) errors.birthDate = 'La fecha de nacimiento debe ser anterior a hoy';

  return errors;
}

export function normalizeCustomer(data: CustomerRequest): CustomerRequest {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    dni: data.dni.trim(),
    birthDate: data.birthDate,
  };
}
