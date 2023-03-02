const { User } = require("../config/db");
const db = require("../config/db");
const { Product } = db;

exports.addProduct = async (req, res) => {
  try {
    const { productName, price } = req.body;

    const product = {
      productName,
      price,
    };

    const newProduct = await Product.create(product);

    const result = {
      id: newProduct.id,
      productName: newProduct.productName,
      price: newProduct.price,
    };
    return res.status(200).json({
      success: true,
      data: result,
      message: "product Added Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();

    const result = products.map((product) => {
      return {
        id: product.id,
        productName: product.productName,
        price: product.price,
      };
    });

    return res.status(200).json({
      success: true,
      data: result,
      message: "product get Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const oldProduct = {
      productName: req.body.productName,
      price: req.body.price,
    };

    const newProduct = await Product.update(oldProduct, { where: { id } });

    if (!newProduct) {
      const error = new Error("Product not found..!");
      error.stausCode = 404;
      throw error;
    }

    const result = {
      id: newProduct.id,
      productName: newProduct.productName,
      price: newProduct.price,
    };

    return res.status(200).json({
      success: true,
      data: result,
      message: "product updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const newProduct = await Product.destroy({ where: { id } });

    if (!newProduct) {
      const error = new Error("Product not found..!");
      error.stausCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ success: true, message: "product deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
