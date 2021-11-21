import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';

import './config/db';
import schema from './graphql_schema';

dotenv.config();

const http = express();

const startApolloServer = async () => {
    const graphql = new ApolloServer({
        schema,
        cors: true,
        playground: process.env.NODE_ENV === 'development' ? true : false,
        introspection: true,
        tracing: true,
        path: '/',
    });

    await graphql.start().catch((err) => throw err);

    graphql.applyMiddleware({
        app: http,
        path: '/',
        cors: true,
        onHealthCheck: () =>
            new Promise((resolve, reject) => {
                if (mongoose.connection.readyState > 0) {
                    resolve();
                } else {
                    reject();
                }
            }),
    });
}

startApolloServer().then(
    () => {
        http.listen({ port: process.env.PORT }, () => {
            console.log(`🚀 Server listening on port ${process.env.PORT}`);
        });  
    }
).catch(
    (err) => {
        console.log(err);
    }
)
