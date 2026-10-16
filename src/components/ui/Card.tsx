import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: ReactNode;
  description?: ReactNode;
}

export function Card({ title, value, description }: CardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-gray-200 p-4">
      <span className="text-xs uppercase tracking-wide text-gray-500">{title}</span>
      <strong className="text-xl text-gray-900">{value}</strong>
      {description && <span className="text-sm text-gray-500">{description}</span>}
    </div>
  );
}
