import { Product } from "../Product";

export interface ProductsResponse {
    responseCode: number;
    products: Product[];
}