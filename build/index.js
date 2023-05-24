"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`
        SELECT * FROM users
        `);
        if (result.length < 1) {
            res.status(400);
            throw new Error("Não existem usuários cadastradas.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users").select("*").innerJoin("purchases", "purchases.buyer_id", "users.id");
        if (result.length < 1) {
            res.status(400);
            throw new Error("Não existem usuários cadastradas.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("products");
        if (result.length < 1) {
            res.status(400);
            throw new Error("Não existem produtos cadastrados.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const result = yield (0, knex_1.db)("products").select("*").where({ name: name });
        if (result.length < 1) {
            res.status(400);
            throw new Error("Não existem produtos cadastrados.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield knex_1.db.raw(`
        SELECT * FROM products
        WHERE id = "${id}" 
        `);
        if (result.length < 1) {
            res.status(400);
            throw new Error("Não existem produtos cadastrados.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("purchases");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, knex_1.db)("purchases").where({ id: id });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Date.now();
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const create_at = Date.now();
        if (!name) {
            res.status(400);
            throw new Error("É obrigatório colocar um nome para cadastrar o song.");
        }
        yield knex_1.db.raw(`
        INSERT INTO users VALUES("${id}", "${name}", "${email}", "${password}", "${create_at}" )
        `);
        res.status(201).send("Cadastro realizado com sucesso.");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Date.now();
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const image_url = req.body.image_url;
        if (!name) {
            res.status(400);
            throw new Error("É obrigatório colocar um nome para cadastrar o song.");
        }
        yield knex_1.db.raw(`
        INSERT INTO products VALUES("${id}", "${name}", "${price}", "${description}", "${image_url}" )
        `);
        res.status(201).send("Produto cadastrado com sucesso.");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImage_url = req.body.image_url;
        const [products] = yield (0, knex_1.db)("products").where({ id: id });
        if (products) {
            yield knex_1.db.update({
                name: newName || products.name,
                price: newPrice || products.price,
                description: newDescription || products.description,
                image_url: newImage_url || products.image_url
            }).from("products").where({ id: id });
        }
        else {
            res.status(404);
            throw new Error("'id' não encontrada");
        }
        res.status(200).send("Produto alterado.");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Date.now();
        const buyer = req.body.buyer;
        const totalPrice = req.body.totalPrice;
        const create_at = Date.now();
        const paid = req.body.paid;
        yield knex_1.db.raw(`
        INSERT INTO purchases VALUES("${id}", "${buyer}", "${totalPrice}", "${create_at}", "${paid}" )
        `);
        res.status(201).send("Produto cadastrado com sucesso.");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [purchases] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (!purchases) {
            res.status(404);
            throw new Error("A compra não existe");
        }
        yield knex_1.db.delete().from("purchases").where({ id: id });
        res.status(200).send("Compra deletada com sucesso");
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map