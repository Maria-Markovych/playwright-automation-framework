import { productData } from "./productData";
import { SearchData } from "../../models/SearchData";

export const searchData: SearchData[] = [
    {
        searchText: "Blue Top",
        expectedCount: 1,
        expectedProducts: [productData.blueTop]
    },
    {
        searchText: "Men Tshirt",
        expectedCount: 1,
        expectedProducts: [productData.menTshirt]
    }
]