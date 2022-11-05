import express from 'express';
import { AppDataSource } from "./data-source"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { ExpenseResolver } from './resolvers/expense.resolver';

import chalk from 'chalk';

import { PORT } from './constants';

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [ExpenseResolver],
                validate: false
            })
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({
            app
        })

        app.listen(PORT, () => {
            console.log(chalk.blue(`Server is running on PORT ${PORT}`));
        });

    }).catch(error => console.log("DB::>", error))
