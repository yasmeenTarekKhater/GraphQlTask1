const { query } = require("express");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");

const orderModel = require("../Models/order.model");
const productModel = require("../Models/product.model");

const { orderType, productType } = require("../Types/types");

const RootQuery = new GraphQLObjectType({
  name: "Root_Query",
  description: "This Action Will Hamdel (Get) All Requests",
  fields: () => ({
    orders: {
      type: new GraphQLList(orderType),
      description: "will get list of orders",
      resolve: () => {
        return orderModel.find();
      },
    },
    order: {
      type: orderType,
      description: "will get order/ID",
      args: {
        // id: { type: GraphQLInt },
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        //args===>{id:2}
        // return Orders.find((order) => order.id == args.id);
        return await orderModel.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(productType),
      description: "will get list of  products",
      resolve: () => {
        return productModel.find();
      },
    },
    product: {
      type: productType,
      description: "will get product/ID",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        //args===>{id:2}
        // return Products.find((product) => product.id == args.id);
        return productModel.findById(args.id);
      },
    },
  }),
});
const MutationQuery = new GraphQLObjectType({
  name: "MutationQuery",
  description: "This action [create-update-delete]",
  fields: () => ({
    addOrder: {
      type: orderType,
      description: "add new order",
      args: {
        // id: { type: new GraphQLNonNull(GraphQLInt)  }, //required
        totalprice: { type: GraphQLInt },
        items: {
          type: new GraphQLList(GraphQLID),
        },
      },
      resolve: async (parent, args) => {
        // Orders.push(args);
        await orderModel.create(args);
        return args;
      },
    },
    updatOrder: {
      type: orderType,
      description: "update exists order",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, //required
        totalprice: { type: GraphQLInt },
        items: {
          type: new GraphQLList(GraphQLID),
        },
      },
      resolve: async (parent, args) => {
        const updatedorder = await orderModel.findByIdAndUpdate(args.id, args);
        return updatedorder;
      },
    },
    deleteOrder: {
      type: orderType,
      description: "delete exists order",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, //required
      },
      resolve: async (parent, args) => {
        const deletedorder = await orderModel.findByIdAndDelete(args.id);
        return deletedorder;
      },
    },
    addProduct: {
      type: productType,
      description: "add new product",
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        await productModel.create(args);
        return args;
      },
    },
    updatProduct: {
      type: productType,
      description: "update exists product",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, //required
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const updatedproduct = await productModel.findByIdAndUpdate(args.id, args);
        return updatedproduct;
      },
    },
    deleteOrder: {
      type: productType,
      description: "delete exists product",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, //required
      },
      resolve: async (parent, args) => {
        const deletedproduct = await productModel.findByIdAndDelete(args.id);
        return deletedproduct;
      },
    },
  }),
});

const MYSCHEMA = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});

module.exports = MYSCHEMA;
