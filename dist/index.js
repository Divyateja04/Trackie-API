"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const expense_resolver_1 = require("./resolvers/expense.resolver");
const constants_1 = require("./constants");
const colors_1 = __importDefault(require("colors"));
data_source_1.db.initialize()
    .then(async () => {
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [expense_resolver_1.ExpenseResolver],
            validate: false
        }),
        context: () => ({
            db: data_source_1.db
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app
    });
    app.listen(constants_1.PORT, () => {
        console.log(colors_1.default.blue(`Server is running on PORT ${constants_1.PORT}`));
    });
}).catch(error => console.log(colors_1.default.red("DB::>" + error.details)));
