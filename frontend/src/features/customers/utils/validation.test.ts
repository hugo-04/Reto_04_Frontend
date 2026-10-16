import type { CustomerRequest } from '../../../types/customer';
import { validateCustomer } from './validation';

const validCustomer: CustomerRequest = {
  firstName: 'Ana',
  lastName: 'Pérez',
  email: 'ana.perez@mail.com',
  dni: '12345678',
  birthDate: '1990-05-20',
};

describe('validateCustomer', () => {
  it('no retorna errores con datos válidos', () => {
    expect(validateCustomer(validCustomer)).toEqual({});
  });

  it('marca los campos obligatorios vacíos', () => {
    const errors = validateCustomer({ firstName: '', lastName: ' ', email: '', dni: '', birthDate: '' });
    expect(Object.keys(errors)).toEqual(['firstName', 'lastName', 'email', 'dni', 'birthDate']);
  });

  it('rechaza DNI sin 8 dígitos y email inválido', () => {
    const errors = validateCustomer({ ...validCustomer, dni: '12ab', email: 'ana@' });
    expect(errors.dni).toBe('El DNI debe tener exactamente 8 dígitos');
    expect(errors.email).toBe('El email no tiene un formato válido');
  });

  it('rechaza fecha de nacimiento futura', () => {
    const errors = validateCustomer({ ...validCustomer, birthDate: '2999-01-01' });
    expect(errors.birthDate).toBe('La fecha de nacimiento debe ser anterior a hoy');
  });
});
