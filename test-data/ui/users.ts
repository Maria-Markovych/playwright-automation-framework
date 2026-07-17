import { User } from "../../models/User";
import { environment } from "../../utils/env";

export const users = {
    validUser: {
        email: environment.userEmail,
        password: environment.userPassword,
        username: environment.userName
    },
    invalidPasswordUser: {
        email: environment.userEmail,
        password: "wrongpassword"
    },
    invalidEmailUser: {
        email: "wrong@example.com",
        password: environment.userPassword
    },
    invalidEmailAndPasswordUser: {
        email: "wrong@example.com",
        password: "wrongpassword"
    }
} satisfies Record<string, User>;