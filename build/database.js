"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducst = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
];
exports.products = [
    {
        id: "1",
        name: "Batata",
        price: 5,
        category: types_1.Category.ACESSORIES
    },
    {
        id: "2",
        name: "Cenoura",
        price: 2,
        category: types_1.Category.ACESSORIES
    }
];
exports.purchases = [
    {
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        quantity: 10,
        totalPrice: exports.products[0].price * 10
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantity: 5,
        totalPrice: exports.products[0].price * 5
    }
];
function createUser(id, email, password) {
    exports.users.push({
        id: id,
        email: email,
        password: password
    });
    console.log("Cadastro realizado com sucesso");
    console.table(exports.users);
}
exports.createUser = createUser;
function getAllUsers() {
    console.log(exports.users);
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id: id,
        name: name,
        price: price,
        category: category
    });
    console.table(exports.products);
}
exports.createProduct = createProduct;
function getAllProducst() {
    console.table(exports.products);
}
exports.getAllProducst = getAllProducst;
function getProductById(id) {
    const result = exports.products.filter((element) => {
        return element.id === id;
    });
    console.log(result);
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    const lista = [];
    const result = exports.products.filter((element) => {
        if (element.name.toLowerCase() === q.toLowerCase()) {
            lista.push(element);
        }
    });
    console.log(result);
    console.log(lista);
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    });
    console.log("Compra realizada com sucesso");
    console.table(exports.purchases);
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userId) {
    console.log("Estou na última");
    const result = exports.purchases.filter((element) => {
        if (element.userId === userId) {
            console.log(element);
        }
    });
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map