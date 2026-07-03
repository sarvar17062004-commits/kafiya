export interface Product {
  id: string;
  name: string;
  category: 'yumaloq' | 'mini' | 'to_gri' | 'sirop';
  categoryLabel: string;
  price: number;
  priceStr: string;
  image: string;
  alt: string;
  description: string;
  weight?: string;
  rating?: number;
  ingredients?: string[];
}

export interface Category {
  id: 'yumaloq' | 'mini' | 'to_gri' | 'sirop';
  label: string;
  image: string;
  alt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl?: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  department: string;
  salary: string;
  experience: string;
  type: string;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Tayyorlanmoqda' | 'Yo\'lda' | 'Yetkazildi' | 'Bekor qilindi';
  paymentMethod: string;
  deliveryAddress: string;
}
