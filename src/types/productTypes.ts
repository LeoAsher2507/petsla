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

export interface IOrderProduct {
  product_id: number;
  quantity: number;
  price: number;
}

// type of order requested
export interface IRequestedOrder {
  orderItems: IOrderProduct[];
  number_phone: string;
  address: string;
  total_price: number;
  note?: string;
}

// type of order server send
export interface IOrder {
  address: string;
  created_at: string | null;
  delivered_at: string | null;
  id: number;
  is_delivered: boolean;
  is_paid: boolean;
  note?: string;
  number_phone: string;
  orderItems: IOrderItem[];
  paid_at: string | null;
  total_price: number;
  user: number;
}

export interface IOrderItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
  image: string;
  product: number;
  order: number;
}

export enum EOrderStatus {
  PENDING,
  SHIPPING,
  DELIVERED,
  CANCELLEDf,
}

// const x = {
//   orderItems: [{ product_id: 8, quantity: 1, price: 360000 }],
//   number_phone: '123123',
//   address: 'Tại cửa',
//   total_price: 360000,
//   note: '',
// };
