const express = require("express");
const cors = require("cors");
const MYSCHEMA = require("./Schema/schema");
const express_GraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/graphData').then(()=>{
  console.log("connecting to DB .......")
}).catch(error=>{
  console.log(error)
})

app.use("/graphql", express_GraphQL({ schema: MYSCHEMA,graphiql:true }));

app.listen(PORT, () => {
  console.log(`Listing on Port ${PORT}........`);
});
