import { Card } from '../../../components/ui/Card';
import type { BirthIndicators, MonthlyBirthStat } from '../../../types/indicator';
import { formatMonthYear } from '../../../utils/date';

function statValue(stat: MonthlyBirthStat | null) {
  return stat ? formatMonthYear(stat.year, stat.month) : '—';
}

function statDescription(stat: MonthlyBirthStat | null) {
  return stat ? `${stat.count} cliente(s) · ${stat.birthRate}%` : undefined;
}

export function IndicatorSummary({ indicators }: { indicators: BirthIndicators }) {
  const { totalCustomers, highest, lowest } = indicators;

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      <Card title="Total de clientes" value={totalCustomers} />
      <Card title="Mes con más nacimientos" value={statValue(highest)} description={statDescription(highest)} />
      <Card title="Mes con menos nacimientos" value={statValue(lowest)} description={statDescription(lowest)} />
    </div>
  );
}
