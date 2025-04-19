
export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  products?: Product[];
}

export interface ContactForm {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  recaptchaToken?: string;
}
