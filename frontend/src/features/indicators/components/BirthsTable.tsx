import type { MonthlyBirthStat } from '../../../types/indicator';
import { formatMonthYear } from '../../../utils/date';

export function BirthsTable({ stats }: { stats: MonthlyBirthStat[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-3 py-2 font-semibold">Mes / Año</th>
            <th className="px-3 py-2 font-semibold">Nacidos</th>
            <th className="px-3 py-2 font-semibold">Tasa de natalidad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stats.map((s) => (
            <tr key={`${s.year}-${s.month}`} className="hover:bg-gray-50">
              <td className="px-3 py-2">{formatMonthYear(s.year, s.month)}</td>
              <td className="px-3 py-2">{s.count}</td>
              <td className="px-3 py-2">{s.birthRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
