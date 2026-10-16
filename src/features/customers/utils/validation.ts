import type { CustomerFilter, CustomerRequest } from '../../../types/customer';
import { today } from '../../../utils/date';

export type CustomerFormErrors = Partial<Record<keyof CustomerRequest, string>>;
export type CustomerFilterErrors = Partial<Record<keyof CustomerFilter, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DNI_REGEX = /^\d{8}$/;
const NAME_REGEX = /^[\p{L}\s'.-]+$/u;

export const DNI_LENGTH = 8;
export const EMAIL_MAX_LENGTH = 150;
export const NAME_MAX_LENGTH = 100;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);
export const isValidDni = (dni: string): boolean => DNI_REGEX.test(dni);
export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

function validateName(value: string, label: string): string | undefined {
  if (!value) return `El ${label} es obligatorio`;
  if (value.length > NAME_MAX_LENGTH) return `El ${label} no puede superar ${NAME_MAX_LENGTH} caracteres`;
  if (!NAME_REGEX.test(value)) return `El ${label} solo puede contener letras`;
  return undefined;
}

function validateEmail(email: string): string | undefined {
  if (email.length > EMAIL_MAX_LENGTH) return `El email no puede superar ${EMAIL_MAX_LENGTH} caracteres`;
  if (!isValidEmail(email)) return 'El email no tiene un formato válido';
  return undefined;
}

function validateDni(dni: string): string | undefined {
  if (!isValidDni(dni)) return `El DNI debe tener exactamente ${DNI_LENGTH} dígitos`;
  return undefined;
}

export function validateCustomer(data: CustomerRequest): CustomerFormErrors {
  const customer = normalizeCustomer(data);
  const errors: CustomerFormErrors = {
    firstName: validateName(customer.firstName, 'nombre'),
    lastName: validateName(customer.lastName, 'apellido'),
    email: customer.email ? validateEmail(customer.email) : 'El email es obligatorio',
    dni: customer.dni ? validateDni(customer.dni) : 'El DNI es obligatorio',
  };

  if (!customer.birthDate) errors.birthDate = 'La fecha de nacimiento es obligatoria';
  else if (customer.birthDate >= today()) errors.birthDate = 'La fecha de nacimiento debe ser anterior a hoy';

  return removeEmpty(errors);
}

export function validateFilter(filter: CustomerFilter): CustomerFilterErrors {
  const dni = filter.dni?.trim() ?? '';
  const email = filter.email?.trim() ?? '';

  return removeEmpty({
    dni: dni ? validateDni(dni) : undefined,
    email: email ? validateEmail(email) : undefined,
  });
}

export function normalizeCustomer(data: CustomerRequest): CustomerRequest {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    dni: data.dni.trim(),
    birthDate: data.birthDate,
  };
}

function removeEmpty<T extends object>(errors: T): T {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as T;
}
