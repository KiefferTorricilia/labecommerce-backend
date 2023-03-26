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




export function createUser (id: string, email: string, password:string):void {
    users.push({
        id: id,
        email: email,
        password: password
    })
    console.log("Cadastro realizado com sucesso")
    console.table(users)
}


export function getAllUsers ():void {
    console.log(users)
}

export function createProduct (id: string, name: string, price: number, category: Category ):void {
    products.push({
        id: id,
        name: name,
        price: price,
        category: category
    })
    console.table(products)
}

export function getAllProducst ():void {
    console.table(products)
}

export function getProductById (id:string) {
    const result = products.filter(
        (element) => {
            return element.id === id
    })
    console.log(result)
}

export function queryProductsByName (q:string):void {
    const lista: TProduct[] = []
    const result = products.filter((element) => {
        if(element.name.toLowerCase() === q.toLowerCase()){
            lista.push(element)
        }
    })
    console.log(result)
    console.log(lista)
}

export function createPurchase (userId:string, productId: string, quantity: number, totalPrice: number ):void {
    purchases.push({
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    })
    console.log("Compra realizada com sucesso")
    console.table(purchases)
}

export function getAllPurchasesFromUserId (userId: string) {
    const result = purchases.filter((element) => {
        if(element.userId === userId ){
            console.log(element)
        }
    })
}