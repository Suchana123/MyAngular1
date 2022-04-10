import { AddressDetails } from "./address.model";

export interface User {
    id: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    token?: string;
    address?: AddressDetails[];
    // payment: IPaymentDetails[];
}