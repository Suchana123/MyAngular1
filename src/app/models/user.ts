import { AddressDetails } from "./address.model";
import { PaymentDetails } from "./payment.model";
export interface User {
    id: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    token?: string;
    address?: AddressDetails[];
    payment?: PaymentDetails[];
}