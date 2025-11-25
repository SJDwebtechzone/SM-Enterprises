const Product = require('../models/Product');
const ProductCollection=require('../models/ProductCollection')

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductCollection.find().populate('category');
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  // console.log("Category requested:", req.params.category);

  try {
    const categorySlug = req.params.category.replace(/-/g, ' ').toLowerCase();

    const products = await ProductCollection.find()
      .populate({
        path: 'category',
        match: { name: new RegExp(`^${categorySlug}$`, 'i') } // case-insensitive exact match
      });

    const filtered = products.filter(p => p.category); // remove unmatched
    res.json(filtered);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// const getProductsByCategory = async (req, res) => {
//   console.log("Category requested:", req.params.category);

//   try {
//     const categoryName = req.params.category.replace(/-/g, ' ').toLowerCase();

//     const productsCollection = await ProductCollection.find()
//       .populate('category') // ✅ populate category object
//       .exec();

//     const filtered = productsCollection.filter(prod =>
//       prod.category?.name?.toLowerCase() === categoryName
//     );

//     res.json(filtered);
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// const getProductsByCategory = async (req, res) => {
//   console.log("Category requested:", req.params.category);
  

//   try {
//     const category = req.params.category.replace(/-/g, ' ').toLowerCase();
//     const productsCollection = await ProductCollection.find({
//       category: { $regex: new RegExp(`^${category}`, 'i') }
//     });
//     res.json(productsCollection);
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
//get search by category
const getProductbySearch = async (req, res) => {
  const { query } = req.query;
 
  try {
    const results = await ProductCollection.find({
      name: { $regex: query, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports = { getAllProducts, getProductsByCategory, getProductbySearch};