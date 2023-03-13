import {TUser, TProduct, TPurchase, Category} from './types'

export const users: TUser[] = [
    {
        id: '1',
        email: 'kieffer.torricilia@gmail.com',
        password: '123423113'
    },
    {
        id: '2',
        email: 'Arthur@gmail.com',
        password: '1234123'
    }
]

export const products: TProduct[] = [
    {
        id: "1",
        name: "Batata",
        price: 5,
        category: Category.ACESSORIES
    },
    {
        id: "2",
        name: "Cenoura",
        price: 2,
        category: Category.ACESSORIES
    }
]

export const purchases: TPurchase[] = [
    {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 10,
        totalPrice: products[0].price * 10
    },
    {
        userId: users[1].id,
        productId: products[1].id,
        quantity: 5,
        totalPrice: products[0].price * 5
    }
]