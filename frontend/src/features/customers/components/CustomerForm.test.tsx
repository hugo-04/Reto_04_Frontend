import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customersApi } from '../../../api/customersApi';
import type { Customer } from '../../../types/customer';
import { CustomerForm } from './CustomerForm';

const createdCustomer: Customer = {
  id: 1,
  firstName: 'Ana',
  lastName: 'Pérez',
  email: 'ana@mail.com',
  dni: '12345678',
  birthDate: '1990-05-20',
  createdAt: '2026-10-16T17:30:12',
};

describe('CustomerForm', () => {
  afterEach(() => vi.restoreAllMocks());

  it('muestra errores y no llama al backend si el formulario es inválido', async () => {
    const createSpy = vi.spyOn(customersApi, 'create');
    render(<CustomerForm />);

    await userEvent.click(screen.getByRole('button', { name: 'Crear cliente' }));

    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El DNI es obligatorio')).toBeInTheDocument();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('envía los datos y muestra mensaje de éxito', async () => {
    const createSpy = vi.spyOn(customersApi, 'create').mockResolvedValue(createdCustomer);
    const onCreated = vi.fn();
    render(<CustomerForm onCreated={onCreated} />);

    await userEvent.type(screen.getByLabelText('Nombre'), ' Ana ');
    await userEvent.type(screen.getByLabelText('Apellido'), 'Pérez');
    await userEvent.type(screen.getByLabelText('Email'), 'ana@mail.com');
    await userEvent.type(screen.getByLabelText('DNI'), '12345678');
    await userEvent.type(screen.getByLabelText('Fecha de nacimiento'), '1990-05-20');
    await userEvent.click(screen.getByRole('button', { name: 'Crear cliente' }));

    expect(createSpy).toHaveBeenCalledWith({
      firstName: 'Ana',
      lastName: 'Pérez',
      email: 'ana@mail.com',
      dni: '12345678',
      birthDate: '1990-05-20',
    });
    expect(await screen.findByText('Cliente Ana Pérez creado con ID 1.')).toBeInTheDocument();
    expect(onCreated).toHaveBeenCalledWith(createdCustomer);
  });

  it('muestra el error devuelto por el backend', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ status: 409, message: 'Ya existe un cliente con el DNI 12345678' }), { status: 409 }),
    );
    render(<CustomerForm />);

    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana');
    await userEvent.type(screen.getByLabelText('Apellido'), 'Pérez');
    await userEvent.type(screen.getByLabelText('Email'), 'ana@mail.com');
    await userEvent.type(screen.getByLabelText('DNI'), '12345678');
    await userEvent.type(screen.getByLabelText('Fecha de nacimiento'), '1990-05-20');
    await userEvent.click(screen.getByRole('button', { name: 'Crear cliente' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe un cliente con el DNI 12345678');
  });
});
