export interface ApiErrorBody {
  timestamp?: string;
  status: number;
  error?: string;
  message: string;
  details?: string[];
}
