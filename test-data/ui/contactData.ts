import { ContactData } from "../../models/ContactData";

export const contactData = {
    validMessage: {
        name: "Mariia Ivanova",
        email: "mariia@test.com",
        subject: "Test subject",
        message: "This is a test message."
    }
} satisfies Record<string, ContactData>;