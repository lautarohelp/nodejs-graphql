const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require("./product.resolvers");


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
    products: getProducts
  },
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct
  }
}

module.exports = resolvers;
