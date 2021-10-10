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

export interface CartItemType extends ItemType {
    quantity: number,
    totalPrice: number
}

export interface User {
    name: string,
    username: string,
    email: string,
    role: string,
    token: string,
    cart: CartItemType[]
}

export interface NewItem extends Omit<ItemType, 'id' | 'imageUrl'> {
    image: File | undefined,
}

export interface SignupUser extends Omit<User, "role" | "token" | "cart"> {
    name: string,
    username: string,
    email: string,
    password: string
}
