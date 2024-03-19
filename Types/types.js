const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID,
  } = require("graphql");
  
const orderModel=require('../Models/order.model');
const productModel=require('../Models/product.model');

const orderType = new GraphQLObjectType({
  name: "orderType",
  description: "orderType",
  fields: () => ({
    id: { type: GraphQLID },
    totalprice: { type: GraphQLInt },
    items: {
      type: new GraphQLList(productType),
      description: "Get products in order",
      resolve:async (parent) => {
        let arr = [];
        let allItems = parent.items; //[2,3]
        let Products= await productModel.find({});
        // console.log(parent);  // output { id: 1, totalprice: 300, items: [ 2, 3 ] }
        for (let i = 0; i < Products.length; i++) {
          for (let j = 0; j < allItems.length; j++) {
            if (Products[i].id == allItems[j]) {
              arr.push(Products[i]);
            }
          }
        }
        return arr;
      },
    },
  }),
});
const productType = new GraphQLObjectType({
  name: "productType",
  description: "productType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    orders: {
      type: new GraphQLList(orderType),
      description: "Get All orders this product in",
      resolve: async (parent) => {
        let myProductId = parent._id;
        let Orders= await orderModel.find();
        let arr = [];
        for (let i = 0; i < Orders.length; i++) {
          const allProducts = Orders[i].items; //[2,3]
          for (let j = 0; j < allProducts.length; j++) {
            if (allProducts[j] = myProductId) {
              arr.push(Orders[i]);
            }
          }
        }
        return arr;
      },
    },
  }),
});

module.exports={orderType,productType}