export interface ItemType {
    avgRating: number,
    description: string,
    id: string,
    imageUrl: string,
    isOnSale: boolean,
    name: string,
    price: number,
    stockCount: number
}

export interface CartItemType {
    avgRating: number,
    description: string,
    id: string,
    imageUrl: string,
    isOnSale: boolean,
    name: string,
    price: number,
    stockCount: number,
    quantity: number,
    totalPrice: number
}

export interface User {
    name: string,
    username: string,
    email: string,
    role: string,
}