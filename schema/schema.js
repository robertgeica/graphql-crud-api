const graphql = require('graphql');
const Category = require('../models/category');
const Note = require('../models/note');
const Tag = require('../models/tag');

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } = graphql;

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    categoryName: { type: GraphQLString },
    notes: {
      type: new graphql.GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({ categoryId: parent.id });
      },
    },
  }),
});

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLID },
    noteTitle: { type: GraphQLString },
    noteBody: { type: GraphQLString },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return Tag.find({ noteId: parent.id });
      },
    },
  }),
});

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    tagName: { type: GraphQLString },
    tagColor: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.findById(args.id);
      },
    },

    note: {
      type: NoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Note.findById(args.id);
      },
    },

    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      },
    },

    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({});
      },
    },

    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return Tag.find({});
      },
    },
  },
});

// mutations

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
