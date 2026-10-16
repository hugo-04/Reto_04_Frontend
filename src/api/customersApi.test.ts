import { buildSearchPath, customersApi } from './customersApi';
import { ApiError } from './httpClient';

describe('customersApi', () => {
  afterEach(() => vi.restoreAllMocks());

  it('construye la ruta de búsqueda solo con los filtros informados', () => {
    expect(buildSearchPath()).toBe('/api/customers');
    expect(buildSearchPath({ dni: ' 12345678 ', email: '' })).toBe('/api/customers?dni=12345678');
    expect(buildSearchPath({ email: 'ana@mail.com' })).toBe('/api/customers?email=ana%40mail.com');
  });

  it('lanza ApiError con el mensaje del backend', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ status: 409, message: 'Ya existe un cliente con el DNI 12345678' }), { status: 409 }),
    );

    const error = await customersApi
      .create({ firstName: 'Ana', lastName: 'Pérez', email: 'ana@mail.com', dni: '12345678', birthDate: '1990-05-20' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 409, message: 'Ya existe un cliente con el DNI 12345678' });
  });
});
