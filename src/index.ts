import { getAllUsers, createUser, createProduct, getAllProducst, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId, users, products, purchases } from './database'
import { Category, TProduct, TPurchase, TUser } from './types'
import express, { Request, Response } from 'express'
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("Pong")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = q ?
        products.filter((element) => {
            return element.name.toLowerCase().includes(q.toLowerCase())
        })
        :
        products
    
    res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response) => {

    const id: string = req.body.id
    const email: string = req.body.email
    const password: string = req.body.password

    const newUsers: TUser = {
        id, email, password
    }
    users.push(newUsers)

    console.log(users)

    res.status(201).send("Usuário cadastro com sucesso")
})

app.post("/products", (req: Request, res: Response) => {

    const id: string = req.body.id
    const name: string = req.body.name
    const price: number = req.body.price
    const category: Category = req.body.category

    const newProduct: TProduct = {
        id, name, price, category
    }

    products.push(newProduct)
    console.log(products)

    res.status(201).send("produto criado com sucesso")

})

app.post("/purchases", (req: Request, res: Response) => {

    const userId: string = req.body.userId;
    const productId: string = req.body.productId;
    const quantity: number = req.body.quantity;
    const totalPrice: number = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId, productId, quantity, totalPrice
    }

    purchases.push(newPurchase)
    console.log(purchases)

    res.status(201).send("Compra feita com sucesso")


})