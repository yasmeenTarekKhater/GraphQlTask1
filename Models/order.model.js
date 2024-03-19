// let Orders = [
//   { id: 1, totalprice: 300, items: [2, 3] },
//   { id: 2, totalprice: 600, items: [1, 2] },
// ];

const { default: mongoose } = require("mongoose");

// module.exports = Orders;

let orderSchema=new mongoose.Schema({
  totalprice:Number,
  items:[{
    type:mongoose.Types.ObjectId,
    ref:"Product"
  }]
});

let orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;
