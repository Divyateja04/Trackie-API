import "reflect-metadata"
import { DataSource } from "typeorm"
import { Expense } from "./entity/Expense"
import { MonthlyExpenses } from './entity/MonthlyExpenses';
import { Evaluative } from './entity/Evaluative';
import { Subject } from './entity/Subject';

export const db = new DataSource({
    type: "postgres",
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: "trackie",
    dropSchema: false,
    synchronize: true,
    logging: true,
    entities: [Expense, MonthlyExpenses, Evaluative, Subject],
    migrations: [],
    subscribers: [],
})
