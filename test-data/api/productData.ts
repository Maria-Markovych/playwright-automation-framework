import { ApiMessageResponse } from "../../api/models/responses/ApiMessageResponse";
import { Product } from "../../api/models/Product";

export const productData = {
    searchKeyword: "top",
    missingSearchParameter: {
        responseCode: 400,
        message:
            "Bad request, search_product parameter is missing in POST request."
    } satisfies ApiMessageResponse,
    firstProduct: {
        id: 1,
        name: "Blue Top",
        brand: "Polo",
        category: {
            category: "Tops",
            usertype: {
                usertype: "Women"
            }
        }
    }
} as const;