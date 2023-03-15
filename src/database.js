"use strict";
exports.__esModule = true;
exports.createUser = exports.purchases = exports.products = exports.users = void 0;
var types_1 = require("./types");
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
// User
// createUser (cria uma nova pessoa na lista de users)
// input: três parâmetros (id, email e password)
// output: frase de sucesso ("Cadastro realizado com sucesso")
// exemplo de chamada: createUser("u003", "beltrano@email.com", "beltrano99")
// getAllUsers (busca todas as pessoas da lista de users)
// input: nenhum
// output: lista atualizada de users
// exemplo de chamada: getAllUsers()
var createUser = function (id, email, password) {
    exports.users.push({
        id: id,
        email: email,
        password: password
    });
    console.log("Cadastro realizado com sucesso");
    console.log(exports.users);
};
exports.createUser = createUser;
