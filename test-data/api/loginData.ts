import { environment } from "../../utils/env";
import { LoginRequest } from "../../api/models/requests/LoginRequest";
import { ApiMessageResponse } from "../../api/models/responses/ApiMessageResponse";

export const loginData = {
    validUser: {
        email: environment.userEmail,
        password: environment.userPassword
    } satisfies LoginRequest,

    validResponse: {
        responseCode: 200,
        message: "User exists!"
    } satisfies ApiMessageResponse,

    missingCredentialsResponse: {
        responseCode: 400,
        message: "Bad request, email or password parameter is missing in POST request."
    } satisfies ApiMessageResponse,

    invalidCredentialsResponse: {
        responseCode: 404,
        message: "User not found!"
    } satisfies ApiMessageResponse,

    invalidCases: [

        {
            title: "invalid password",
            email: environment.userEmail,
            password: "WrongPassword"
        },

        {
            title: "invalid email",
            email: "wrong@test.com",
            password: environment.userPassword
        }

    ]

} as const;

