"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Expense_1 = require("./entity/Expense");
exports.db = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "trackie",
    synchronize: true,
    logging: false,
    entities: [Expense_1.Expense],
    migrations: [],
    subscribers: [],
});
