const getProduct = (_, { id }) => {
  return {
    id,
    name: 'Lauatro',
    price: 100.12,
    description: 'bla bla blaaaa',
    image: 'http://image.asas',
    createdAt: new Date().toISOString(),
  }
}

const getProducts = (_, args) => {
  return [];
}

const addProduct = () => {
  // code
}

module.exports = { getProduct, getProducts }
