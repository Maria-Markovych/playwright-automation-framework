import { User } from "../models/User";

export class UserFactory {

    static createUser(overrides?: Partial<User>): User {
        const timestamp = Date.now();
        return {
            email: `user_${timestamp}@example.com`,
            password: "12345",
            username: `user_${timestamp}`,
            ...overrides
        }
    }
}

