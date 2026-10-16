import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { BirthsChart } from '../features/indicators/components/BirthsChart';
import { BirthsTable } from '../features/indicators/components/BirthsTable';
import { IndicatorSummary } from '../features/indicators/components/IndicatorSummary';
import { useIndicators } from '../features/indicators/hooks/useIndicators';

export function IndicatorsPage() {
  const { indicators, loading, error, reload } = useIndicators();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Indicadores de natalidad</h2>
        <Button variant="secondary" onClick={reload} disabled={loading}>
          Actualizar
        </Button>
      </div>

      {error && <Alert type="error">{error}</Alert>}
      {loading && <Spinner />}

      {indicators && !loading && (
        <>
          <IndicatorSummary indicators={indicators} />
          {indicators.birthsByMonth.length === 0 ? (
            <p className="text-sm text-gray-500">No hay clientes registrados.</p>
          ) : (
            <>
              <BirthsChart stats={indicators.birthsByMonth} />
              <BirthsTable stats={indicators.birthsByMonth} />
            </>
          )}
        </>
      )}
    </section>
  );
}
