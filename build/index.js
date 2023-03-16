"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
(0, database_1.createUser)("3", "Everton@gmail.com", "123456");
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("3", "Monitor 14 Polegadas", 800, types_1.Category.ELECTRONICS);
(0, database_1.getAllProducst)();
(0, database_1.getProductById)("1");
//# sourceMappingURL=index.js.map