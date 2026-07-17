import { CreateAccountRequest } from "../../api/models/requests/CreateAccountRequest";
import { ApiMessageResponse } from "../../api/models/responses/ApiMessageResponse";

export const accountData = {
    createAccountResponse: {
        responseCode: 201,
        message: "User created!"
    } satisfies ApiMessageResponse,

    deleteAccountResponse: {
        responseCode: 200,
        message: "Account deleted!"
    } satisfies ApiMessageResponse,

    updateAccountResponse: {
        responseCode: 200,
        message: "User updated!"
    } satisfies ApiMessageResponse,

    existingEmailResponse: {
        responseCode: 400,
        message: "Email already exists!"
    } satisfies ApiMessageResponse
}