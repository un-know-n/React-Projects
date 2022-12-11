//Product from API
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

//Rating for product
export interface IProductRating {
  rate: number;
  count: number;
}
