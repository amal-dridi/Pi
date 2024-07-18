const Models = require("./../models");
const Product = Models.Product;
const { Op } = require('sequelize');
// ajouter produit
exports.addProduct = async (req, res) => {
    try {
        const { name, des, category , actualPrice, discount, avail, imagepath } = req.body;

        // Calcul du prix
        const temp = (actualPrice) * (discount / 100);
        const price = actualPrice - temp;

        // Création du produit avec le prix calculé
        const newProduct = await Product.create({
            name,
            des, 
            category ,
            actualPrice,
            discount,
            price,
            avail, 
            imagepath
        });

        res.status(201).json(newProduct);
    } catch (err) {
        // Gérer les erreurs
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.UpdateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, des, category , actualPrice, discount, avail, imagepath } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      const temp = (actualPrice) * (discount / 100);
        const price = actualPrice - temp;
      // Mettre à jour le produit
      await Product.update(
          { name, des, category , actualPrice, discount, price , avail, imagepath },
          { where: { id } }
      );

      res.send('Product updated successfully');
  } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};


//GetAllProduct
exports.getAllProduct = (req, res) => {
    Product.findAll()
      .then((products) => {
        res.status(200).json({ products });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  };
  exports.getAdminProduct = (req, res) => {
    Product.findAll()
      .then((products) => {
        res.status(200).json({ products });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  };

  exports.getbysearch = async (req, res) => {
    const keyword = req.params.keyword;
    const products = await Product.findAll({ where: { name: { [Op.like]: `%${keyword}%` } } });
    res.json(products);
  };

//GetProductBytype
exports.GetTunisianProduct = (req, res) => {
    
    Product.findAll({ where: { category: 'Tunisien' } }).then((products)=>{
            res.status(200).json({ products });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
  };



exports.GetIndianProduct = (req, res) => {
    
    Product.findAll({ where: { category: 'indian' } }).then((products)=>{
            res.status(200).json({ products });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
  };

exports.GetMexicanProduct = (req, res) => {
    
    Product.findAll({ where: { category: 'mexican' } }).then((products)=>{
            res.status(200).json({ products });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
  };
exports.GetItalienProduct = (req, res) => {
    
    Product.findAll({ where: { category: 'italian' } }).then((products)=>{
            res.status(200).json({ products });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
  };

//deleteProduct
 exports.deleteProduct = async (req, res) => {
        Product.destroy({where:{id:req.params.id}}).then(
            ()=>{
              res.send('removed')
            })  
            .catch((err) => {
                res.status(400).json({
                  error: err,
                });
              });
      };
      
  