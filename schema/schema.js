const graphql = require('graphql');
const Category = require('../models/category');
const Note = require('../models/note');
const Tag = require('../models/tag');

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } = graphql;

// category type
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

// note type
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
    tagColor: { type: GraphQLString }
  })
})
// tag type

// root query

// mutations
