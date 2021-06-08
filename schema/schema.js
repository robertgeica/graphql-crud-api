const graphql = require('graphql');
const Category = require('../models/category');
const Note = require('../models/note');
const Tag = require('../models/tag');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    categoryName: { type: GraphQLString },
    notes: {
      type: new GraphQLList(NoteType),
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
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCategory: {
      type: CategoryType,
      args: {
        categoryName: { type: GraphQLString },
      },
      resolve(parent, args) {
        let category = new Category({
          categoryName: args.categoryName,
        });
        return category.save();
      },
    },

    addNote: {
      type: NoteType,
      args: {
        noteTitle: { type: new GraphQLNonNull(GraphQLString) },
        noteBody: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let note = new Note({
          noteTitle: args.noteTitle,
          noteBody: args.noteBody,
          categoryId: args.categoryId,
        });
        return note.save();
      },
    },

    addTag: {
      type: TagType,
      args: {
        tagName: { type: new GraphQLNonNull(GraphQLString) },
        tagColor: { type: new GraphQLNonNull(GraphQLString) },
        noteId: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        let tag = new Tag({
          tagName: args.tagName,
          tagColor: args.tagColor,
          noteId: args.noteId,
        });
        return tag.save();
      },
    },

    updateTag: {
      type: TagType,
      args: {
        tagId: { type: new GraphQLNonNull(GraphQLID) },
        tagName: { type: new GraphQLNonNull(GraphQLString) },
        tagColor: { type: new GraphQLNonNull(GraphQLString) },
        noteId: { type: GraphQLList(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          await Tag.findOneAndUpdate(
            { _id: args.tagId },
            { $set: { tagName: args.tagName, tagColor: args.tagColor } },
            { new: true }
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
