"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
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
    console.log(exports.products);
    exports.products.push({
        id: id,
        name: name,
        price: price,
        category: category
    });
    console.log(exports.products);
}
exports.createProduct = createProduct;
//# sourceMappingURL=database.js.map