export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IProductRating;
  size?: Array<string>;
}

export interface IProductRating {
  rate: number;
  count: number;
}
