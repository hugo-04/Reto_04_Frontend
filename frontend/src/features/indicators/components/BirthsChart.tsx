import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { MonthlyBirthStat } from '../../../types/indicator';
import { formatMonthYear } from '../../../utils/date';

export function BirthsChart({ stats }: { stats: MonthlyBirthStat[] }) {
  const data = stats.map((s) => ({ label: formatMonthYear(s.year, s.month), count: s.count }));

  return (
    <div className="mb-6 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => [value, 'Nacidos']} />
          <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
