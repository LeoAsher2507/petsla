export interface IProduct {
  id: number;
  category: number;
  created_date: string;
  description: string;
  images: string;
  modified_date: string;
  price: number;
  product_name: string;
  stock: number;
}

export interface ICartProduct {
  id: number;
  product_name: string;
  images: string;
  price: number;
  quantity: number;
  created_date: string;
  modified_date: string;
}
