export interface Equipment {
  id: string;
  name: string;
  category: string;
  dailyRate: number;
  imageUrl: string;
  specs: string[];
  requirements: string[];
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: number;
  message: string;
}
