import { Category } from "./Category";

export interface Product {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: Category;
}