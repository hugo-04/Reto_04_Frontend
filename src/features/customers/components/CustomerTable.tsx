import type { Customer } from '../../../types/customer';
import { formatDate, formatDateTime } from '../../../utils/date';

const HEADERS = ['ID', 'Nombre', 'Apellido', 'Email', 'DNI', 'Nacimiento', 'Creado'];

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return <p className="py-4 text-sm text-gray-500">No se encontraron clientes.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {HEADERS.map((header) => (
              <th key={header} className="whitespace-nowrap px-3 py-2 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="px-3 py-2">{c.id}</td>
              <td className="px-3 py-2">{c.firstName}</td>
              <td className="px-3 py-2">{c.lastName}</td>
              <td className="px-3 py-2">{c.email}</td>
              <td className="px-3 py-2">{c.dni}</td>
              <td className="whitespace-nowrap px-3 py-2">{formatDate(c.birthDate)}</td>
              <td className="whitespace-nowrap px-3 py-2">{formatDateTime(c.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
