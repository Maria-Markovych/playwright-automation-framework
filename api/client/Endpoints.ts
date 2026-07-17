import { environment } from "../../utils/env";

export const Endpoints = {
    products: `${environment.apiUrl}/productsList`,
    brands: `${environment.apiUrl}/brandsList`,
    searchProduct: `${environment.apiUrl}/searchProduct`,
    verifyLogin: `${environment.apiUrl}/verifyLogin`,
    createAccount: `${environment.apiUrl}/createAccount`,
    deleteAccount: `${environment.apiUrl}/deleteAccount`,
    updateAccount: `${environment.apiUrl}/updateAccount`,
    getUserDetailByEmail: `${environment.apiUrl}/getUserDetailByEmail`
} as const;