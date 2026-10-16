import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface AlertProps {
  type: 'success' | 'error';
  children: ReactNode;
}

export function Alert({ type, children }: AlertProps) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={cn(
        'my-3 rounded-md px-4 py-3 text-sm',
        type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700',
      )}
    >
      {children}
    </div>
  );
}
