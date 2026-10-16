export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  birthDate: string;
  createdAt: string;
}

export interface CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  birthDate: string;
}

export interface CustomerFilter {
  dni?: string;
  email?: string;
}
