import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomerSearch } from './CustomerSearch';

function setup() {
  const onSearch = vi.fn();
  render(<CustomerSearch onSearch={onSearch} loading={false} />);
  return { onSearch };
}

describe('CustomerSearch', () => {
  it('solo permite escribir dígitos en el DNI', async () => {
    setup();
    const dniInput = screen.getByLabelText('DNI');

    await userEvent.type(dniInput, '12ab34');

    expect(dniInput).toHaveValue('1234');
  });

  it('no busca y muestra errores si el DNI o el email son inválidos', async () => {
    const { onSearch } = setup();

    await userEvent.type(screen.getByLabelText('DNI'), '123');
    await userEvent.type(screen.getByLabelText('Email'), 'ana@');
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(screen.getByText('El DNI debe tener exactamente 8 dígitos')).toBeInTheDocument();
    expect(screen.getByText('El email no tiene un formato válido')).toBeInTheDocument();
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('busca con los filtros válidos', async () => {
    const { onSearch } = setup();

    await userEvent.type(screen.getByLabelText('DNI'), '12345678');
    await userEvent.type(screen.getByLabelText('Email'), ' ana@mail.com ');
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).toHaveBeenCalledWith({ dni: '12345678', email: 'ana@mail.com' });
  });

  it('limpia los filtros y lista todos los clientes', async () => {
    const { onSearch } = setup();

    await userEvent.type(screen.getByLabelText('DNI'), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Limpiar' }));

    expect(screen.getByLabelText('DNI')).toHaveValue('');
    expect(onSearch).toHaveBeenCalledWith({});
  });
});
