module.exports = (connection, Datatype) => {
  const productSchema = {
    productName: {
      type: Datatype.STRING,
    },
    price: {
      type: Datatype.INTEGER,
    },
  };
  const product = connection.define("product", productSchema);
  return product;
};
