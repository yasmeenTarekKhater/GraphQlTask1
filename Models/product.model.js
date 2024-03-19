// let Products = [
//   { id: 1, name: "ProductOne", price: 400 },
//   { id: 2, name: "ProductTwo", price: 200 },
//   { id: 3, name: "Productthree", price: 100 },
// ];

const { default: mongoose } = require("mongoose");

// module.exports = Products;

let productSchema=new mongoose.Schema({
  name:String,
  price:Number
});
let productModel=mongoose.model("Product",productSchema);
module.exports=productModel;