const { RegularExpression } = require("graphql-scalars");
const { login } = require("./auth.resolvers");
const { addCategory, getCategory } = require("./category.resolvers");
const { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory } = require("./product.resolvers");

const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z]{3,8}$/)

const resolvers = {
  Query: {
    hello: () => 'hola mundo',
    getPerson: (_, args) => `Hello, my name is ${args.name}, I'm ${args.age} years old!`,
    getInit: (_, args) => args.age,
    getFloat: (_, args) => `Its price $${args.price}`,
    getString: () => 'Hello world',
    getBoolean: () => true,
    getID: () => '1234567890',
    getNumbers: (_, args) => args.numbers,
    // Products
    product: getProduct,
    products: getProducts,
    category: getCategory
  },
  Mutation: {
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory
  }
}

module.exports = resolvers;
