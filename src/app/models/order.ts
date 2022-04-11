export interface OrderDetails{
    basePrice: number;
    imageUrl: string;
    quantity: number;
    itemPrice: number;
    foodId: number;
    foodName: string;
    desc: string;
}
export interface OrderStatus{
    id ?: string;
    userid: number;
    feedId: number;
    orderstatus: string;
    paymentStatus: string;
    orderDateTime: string;
}