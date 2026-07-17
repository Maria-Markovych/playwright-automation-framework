import { ProductCardData } from "../../models/ProductCardData";

export const productData = {
    blueTop: {
        productName: "Blue Top",
        category: "Women > Tops",
        price: 500,
        availability: "In Stock",
        condition: "New",
        brand: "Polo"
    },
    menTshirt: {
        productName: "Men Tshirt",
        category: "Men > Tshirts",
        price: 400,
        availability: "In Stock",
        condition: "New",
        brand: "H&M"
    }, 
    
} satisfies Record<string, ProductCardData>;