export interface MonthlyBirthStat {
  year: number;
  month: number;
  count: number;
  birthRate: number;
}

export interface BirthIndicators {
  totalCustomers: number;
  birthsByMonth: MonthlyBirthStat[];
  highest: MonthlyBirthStat | null;
  lowest: MonthlyBirthStat | null;
}
