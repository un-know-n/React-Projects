export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IProductRating;
  size?: string;
}

export interface IProductRating {
  rate: number;
  count: number;
}
