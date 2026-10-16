import type { CustomerRequest } from '../../../types/customer';
import { normalizeCustomer, onlyDigits, validateCustomer, validateFilter } from './validation';

const validCustomer: CustomerRequest = {
  firstName: 'Ana María',
  lastName: "Pérez O'Neill",
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
    expect(errors).toEqual({
      firstName: 'El nombre es obligatorio',
      lastName: 'El apellido es obligatorio',
      email: 'El email es obligatorio',
      dni: 'El DNI es obligatorio',
      birthDate: 'La fecha de nacimiento es obligatoria',
    });
  });

  it.each(['1234567', '123456789', '1234567a', '12 34567'])('rechaza el DNI "%s"', (dni) => {
    expect(validateCustomer({ ...validCustomer, dni }).dni).toBe('El DNI debe tener exactamente 8 dígitos');
  });

  it.each(['ana', 'ana@', 'ana@mail', 'ana@mail.c', 'ana perez@mail.com', '@mail.com'])('rechaza el email "%s"', (email) => {
    expect(validateCustomer({ ...validCustomer, email }).email).toBe('El email no tiene un formato válido');
  });

  it('rechaza email que supera 150 caracteres', () => {
    const email = `${'a'.repeat(145)}@mail.com`;
    expect(validateCustomer({ ...validCustomer, email }).email).toBe('El email no puede superar 150 caracteres');
  });

  it('rechaza nombres con números', () => {
    expect(validateCustomer({ ...validCustomer, firstName: 'Ana1' }).firstName).toBe('El nombre solo puede contener letras');
  });

  it('rechaza fecha de nacimiento futura', () => {
    const errors = validateCustomer({ ...validCustomer, birthDate: '2999-01-01' });
    expect(errors.birthDate).toBe('La fecha de nacimiento debe ser anterior a hoy');
  });
});

describe('validateFilter', () => {
  it('permite buscar sin filtros', () => {
    expect(validateFilter({})).toEqual({});
    expect(validateFilter({ dni: ' ', email: '' })).toEqual({});
  });

  it('acepta DNI y email válidos', () => {
    expect(validateFilter({ dni: '12345678', email: 'ana@mail.com' })).toEqual({});
  });

  it('rechaza DNI y email inválidos', () => {
    expect(validateFilter({ dni: '123', email: 'ana@' })).toEqual({
      dni: 'El DNI debe tener exactamente 8 dígitos',
      email: 'El email no tiene un formato válido',
    });
  });
});

describe('normalización', () => {
  it('elimina espacios y pasa el email a minúsculas', () => {
    expect(normalizeCustomer({ ...validCustomer, firstName: ' Ana ', email: ' ANA@Mail.com ' })).toMatchObject({
      firstName: 'Ana',
      email: 'ana@mail.com',
    });
  });

  it('deja solo dígitos en el DNI', () => {
    expect(onlyDigits('12a34-56 78')).toBe('12345678');
  });
});
