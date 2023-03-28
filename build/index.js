"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.status(200).send("Pong");
});
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
    }
});
app.get("/purchases", (req, res) => {
    try {
        res.status(200).send(database_1.purchases);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
    }
});
app.get("/products/search", (req, res) => {
    try {
        const q = req.query.q;
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("O termo de busca deve ter no mínimo um caractere");
            }
        }
        const result = q ?
            database_1.products.filter((element) => {
                return element.name.toLowerCase().includes(q.toLowerCase());
            })
            :
                database_1.products;
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.status(400).send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find((element) => element.id === id);
        if (!result) {
            res.status(200);
            throw new Error("É necessário inserir um id válido.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.get("/purchases/:id", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.purchases.find((element) => element.userId === id);
        if (!result) {
            res.status(200);
            throw new Error("Inserir um id válido.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const checkId = database_1.users.find((element) => element.id === id);
        const checkEmail = database_1.users.find((element) => element.email === email);
        if (!id) {
            throw new Error("É necessário cadastrar um id");
        }
        if (checkId) {
            throw new Error("O usuário cadastrado não pode possuir o id de um outro usuário já existente.");
        }
        if (!email) {
            throw new Error("É necessário cadastrar um email.");
        }
        if (checkEmail) {
            throw new Error("O usuário cadastrado não pode possuir o email de um já existente.");
        }
        if (!password) {
            throw new Error("É necessário cadastrar uma password.");
        }
        const newUsers = {
            id, email, password
        };
        database_1.users.push(newUsers);
        console.log(database_1.users);
        res.status(201).send("Usuário cadastro com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const checkId = database_1.products.find((element) => element.id === id);
        if (id === undefined) {
            res.status(400);
            throw new Error("É necessário cadastrar um id.");
        }
        if (checkId) {
            res.status(400);
            throw new Error("Não é possível cadastrar o id de um produto já existente.");
        }
        if (name === undefined) {
            res.status(400);
            throw new Error("É necessário cadastrar um name.");
        }
        if (price === undefined) {
            res.status(400);
            throw new Error("É necessário inserir o price.");
        }
        if (category === undefined) {
            res.status(400);
            throw new Error("É necessário inserir a category.");
        }
        const newProduct = {
            id, name, price, category
        };
        database_1.products.push(newProduct);
        console.log(database_1.products);
        res.status(201).send("produto criado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/purchases", (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const checkUserId = database_1.users.find((element) => element.id === userId);
        const checkProductId = database_1.products.find((element) => element.id === productId);
        if (userId === undefined) {
            res.status(400);
            throw new Error("É necessário inserir um id.");
        }
        if (!checkUserId) {
            res.status(400);
            throw new Error("O id do usuário que fez a compra deve existir no array de usuários cadastrados.");
        }
        if (productId === undefined) {
            res.status(400);
            throw new Error("É necessário inserir o product.");
        }
        if (!checkProductId) {
            res.status(400);
            throw new Error("O id do produto que foi comprado deve existir no array de produtos cadastrados");
        }
        if (quantity === undefined) {
            res.status(400);
            throw new Error("É necessário inserir a quantity.");
        }
        const totalPrice = quantity * checkProductId.price;
        const newPurchase = {
            userId, productId, quantity, totalPrice
        };
        database_1.purchases.push(newPurchase);
        console.log(database_1.purchases);
        res.status(201).send("Compra feita com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const checkId = database_1.users.find((element) => element.id === id);
        if (!checkId) {
            res.status(400);
            throw new Error("É necessário inserir um id válido.");
        }
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        if (!newEmail) {
            res.status(400);
            throw new Error("É necessário inserir um email.");
        }
        if (!newPassword) {
            res.status(400);
            throw new Error("É necessário inserir uma password");
        }
        const result = database_1.users.find((element) => element.id === id);
        if (result) {
            result.email = newEmail || result.email;
            result.password = newPassword || result.password;
        }
        res.status(200).send("Usuário alterado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
        const result = database_1.products.find((element) => element.id === id);
        if (!result) {
            res.status(400);
            throw new Error("É necessário inserir um id válido.");
        }
        if (!newName) {
            res.status(400);
            throw new Error("É necessário inserir um name.");
        }
        if (!newPrice) {
            res.status(400);
            throw new Error("É necessário inserir um price.");
        }
        if (!newCategory) {
            res.status(400);
            throw new Error("É necessário inserir uma category.");
        }
        if (result) {
            result.name = newName || result.name;
            result.price = isNaN(newPrice) ? result.price : newPrice;
            result.category = newCategory || result.category;
        }
        res.status(200).send("Usuário alterado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.delete("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const userIndex = database_1.users.findIndex((element) => element.id === id);
        if (userIndex >= 0) {
            database_1.users.splice(userIndex, 1);
        }
        else {
            res.status(200);
            throw new Error("Inserir um id válido.");
        }
        res.status(200).send("Usuário deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const productIndex = database_1.products.findIndex((element) => element.id === id);
        if (productIndex >= 0) {
            database_1.products.splice(productIndex, 1);
        }
        else {
            res.status(500);
            throw new Error("Inserir um id válido");
        }
        res.status(200).send("Produto deletado com sucesso.");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
//# sourceMappingURL=index.js.map