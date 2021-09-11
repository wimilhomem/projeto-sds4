import { TSeller } from "./seller"

export type TSale = {
  id: number;
  visited: number;
  deals: number;
  amount: number;
  date: string;
  seller: TSeller;
}
export type TSalePage = {
  content?: TSale[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  number: number;
  numberOfElements?: number;
  size?: number;
  empty?: boolean;

}


export type TSaleSum = {
  sellerName: string;
  sum: number;
}

export type TSaleSucess = {
  sellerName: string;
  visited: number;
  deals: number;
}