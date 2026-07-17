import { Brand } from "../../api/models/Brand"

export const brandData = {
    firstBrand: {
        id: 1,
        brand: "Polo"
    } satisfies Brand
} as const;