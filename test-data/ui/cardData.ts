import { CardData } from "../../models/CardData";

export const cardData = {
    validCard: {
        cardName: "valid test card",
        cardNumber: "111111111111111",
        cvc: "123",
        expirationMonth: "12",
        expirationYear: "2028"
    },
    invalidCard: {
        cardName: "valid test card",
        cardNumber: "1234",
        cvc: "123",
        expirationMonth: "12",
        expirationYear: "2028"
    }
} satisfies Record<string, CardData>;