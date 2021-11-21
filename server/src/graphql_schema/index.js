import { SchemaComposer } from 'graphql-compose';

// import db from '../config/db'; 

const graphQLSchemaComposer = new SchemaComposer();

import { ProductQuery, ProductMutation } from './product';
import { UserQuery, UserMutation } from './user';


graphQLSchemaComposer.Query.addFields({
    ...ProductQuery,
    ...UserQuery,
});

graphQLSchemaComposer.Mutation.addFields({
    ...ProductMutation,
    ...UserMutation,
});

export default graphQLSchemaComposer.buildSchema();