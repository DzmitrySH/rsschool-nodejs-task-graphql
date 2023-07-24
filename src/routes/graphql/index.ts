import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { rootQuery } from './queries/rootQuery.js';
// import { rootMutation } from './mutation/rootMutation.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const schema = new GraphQLSchema({
        query: rootQuery,
        // mutation: rootMutation,
      });

      const { query, variables } = req.body;
      const isValid = validate(schema, parse(query), [depthLimit(5)]);
      if(isValid.length !==0) {
        return { errors: isValid };
      }

      const result = await graphql({
        schema: schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma }
      });

      return result;
    },
  });
};

export default plugin;
