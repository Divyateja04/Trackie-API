import "reflect-metadata";
import express from 'express';

import { db } from "./data-source"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { ExpenseResolver } from './resolvers/expense.resolver';
import { SubjectResolver } from './resolvers/subject.resolver';
import { MonthlyExpensesResolver } from './resolvers/monthlyexpenses.resolver';
import { EvaluativeResolver } from './resolvers/evaluative.resolver';

import 'cors';

import { PORT } from './constants';

import colors from 'colors';

db.initialize()
.then(async () => {        
        const app = express();

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [ExpenseResolver, SubjectResolver, MonthlyExpensesResolver, EvaluativeResolver],
                validate: false
            }),
            context: () => ({
                db: db
            }),
            // csrfPrevention: true,
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({
            app,
            // cors: {
            //     origin: [
            //         "*"
            //     ]
            // }
        })

        app.listen(PORT, () => {
            console.log(colors.blue(`Server is running on PORT ${PORT}`));
        });

    }).catch(error => console.log(colors.red("DB::>" +  error)))
