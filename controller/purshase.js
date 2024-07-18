
const Models = require("../models");
const { sequelize } = require("../models");
const Product = Models.Product;
const Cart = Models.Cart;
const Purshase = Models.Purshase;

exports.getAll = async (req, res) => {
  try {
    const purchases = await Purshase.findAll();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deletePurchase = async (req, res) => {
  Purshase.destroy({where:{id:req.params.id}}).then(
      ()=>{
        res.send('removed')
      })  
      .catch((err) => {
          res.status(400).json({
            error: err,
          });
        });
};


exports.buyProducts = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const cartItems = await Cart.findAll({
      include: [{ model: Product, as: 'Product' }]
    });
    const { transactionId } = req.body;

    for (const item of cartItems) {
      const { quantity, price, Product: product } = item;
      const productname = product.name;
      const dop = new Date();

      await Purshase.create(
        { totalcost: price, dop, quantity, productname, transactionid: transactionId },
        { transaction }
      );
    }

    await Cart.destroy({ where: {}, transaction });

    await transaction.commit();
    res.json({ message: 'Purchase successful' });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};




