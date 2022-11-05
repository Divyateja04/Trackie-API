import "reflect-metadata"
import { DataSource } from "typeorm"
import { Expense } from "./entity/Expense"

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "trackie",
    synchronize: true,
    logging: false,
    entities: [Expense],
    migrations: [],
    subscribers: [],
})
