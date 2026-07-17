
import { ProductCardData } from "./ProductCardData";

export interface SearchData {
    searchText: string;
    expectedCount: number;
    expectedProducts: ProductCardData[];
}