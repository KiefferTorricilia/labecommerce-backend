import { getAllUsers, createUser, createProduct, getAllProducst, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId, users, products } from './database'
import { Category } from './types'
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