
const Models = require("./../models");
const Product = Models.Product;
const Cart = Models.Cart;
const Purshase = Models.Purshase;


// add to cart
  exports.addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const cartItem = await Cart.create({
        ProductId: productId,
        quantity: quantity,
        price: product.price * quantity
      });
  
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getCartItems = async (req, res) => {
    try {
      const cartItems = await Cart.findAll({
        include: {
          model: Product,
          attributes: ['id', 'name', 'des', 'price', 'category', 'imagepath']
        }
      });
  
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getAllCarts = async (req, res) => {
    Cart.findAll()
      .then((carts) => {
        res.status(200).json({ carts});
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
};



exports.addNew = async (req, res) => {
    const id = req.params.id;
    const { quantity, productId } = req.body; // Assurez-vous que l'ID du produit et la quantité actuelle sont envoyés dans le corps de la requête

    try {
        const cart = await Cart.findByPk(id);

        if (!cart) {
            return res.status(404).json({ error: `Cart item not found with id ${id}` });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: `Product not found with id ${productId}` });
        }

        const newQuantity = quantity + 1;
        cart.quantity = newQuantity;
        cart.price = product.price * newQuantity;

        const updatedCart = await cart.save();

        return res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the cart item.' });
    }

};
// eliminer
exports.lessOne = async (req, res) => {
    const id = req.params.id;
    const { quantity, productId } = req.body; // Assurez-vous que l'ID du produit et la quantité actuelle sont envoyés dans le corps de la requête

    try {
        const cart = await Cart.findByPk(id);

        if (!cart) {
            return res.status(404).json({ error: `Cart item not found with id ${id}` });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: `Product not found with id ${productId}` });
        }

        const newQuantity = quantity - 1;

        if (newQuantity !== 0) {
            cart.quantity = newQuantity;
            cart.price = product.price * newQuantity;
            const updatedCart = await cart.save();
            return res.status(200).json(updatedCart);
        } else {
            await Cart.destroy({ where: { id: id } });
            return res.status(200).json({ message: 'Cart item deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the cart item.' });
    }


};

exports.deleteCart = async (req, res) => {
    Cart.destroy({where:{id:req.params.id}}).then(
        ()=>{
          res.send('removed')
        })  
        .catch((err) => {
            res.status(400).json({
              error: err,
            });
          });

};


exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;

    const cartItem = await Cart.findByPk(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    cartItem.price = price;

    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.destroy({ where: {} });

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

