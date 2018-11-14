import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import PlaceModel from '../../model/placeModel';

const placeType = new GraphQLObjectType({
  name: 'place',
  description: 'place description',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'places title',
    },
    description: {
      type: GraphQLString,
      description: 'places description',
    },
    url: {
      type: GraphQLString,
      description: 'places url',
    },
    image: {
      type: GraphQLString,
      description: 'places image',
    },
    price: {
      type: GraphQLString,
      description: 'places price',
    },
    date: {
      type: GraphQLString,
      description: 'places date',
    },
    rawDate: {
      type: GraphQLString,
      description: 'places original date value'
    }
  }),
});

const placeSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      place: {
        type: new GraphQLList(placeType),
        args: {
          uuid: {
            name: 'uuid',
            type: GraphQLString,
          },
        },
        resolve: (root, { uuid }) => {
          const foundplaces = new Promise((resolve, reject) => {
            const query = uuid ? { uuid } : {};
            PlaceModel.find(
              query,
              (error, places) => (
                error ? reject(error) : resolve(places)
              )
            )
          });
          return foundplaces;
        },
      },
    },
  }),
});

export default placeSchema;
