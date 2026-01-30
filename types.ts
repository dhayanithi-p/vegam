
export enum Category {
  BIRYANI = 'Biryani',
  STARTERS = 'Starters',
  GRAVY = 'Gravy',
  FRIED = 'Fried',
  ROLLS = 'Rolls',
  COMBOS = 'Combos',
}

export interface FoodItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
  isBestseller: boolean;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  discount?: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface RestaurantDetails {
  name: string;
  city: string;
  phone: string;
  address?: string;
  opensAt?: string;
  closesAt?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  landmark?: string;
  date: string;
}
