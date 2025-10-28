const Product = require('../models/ProductCollection');
const CategoryCollection = require('../models/CategoryCollection');

const productCatalog = {
  "Brass Bell": [
    {
      name: "Brass Bell Small",
      image: '/uploads/Bell.jpg',
      price: 900,
      category: "Brass Bell Small",
      originalPrice: 699,
      discount: '30%',
      sale: 380,
      sizes: ['S'],
      offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
      sku: 'GLAT123',
      details: {
        Material: 'Virgin Quality Brass',
        Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
        About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya...'
      }
    },
    // Add more products...
  ],
  "Hundi": [
    {
      name: "Temple Hundi",
      image: '/uploads/Hundi.jpg',
      price: 600,
      category: "Decorative Hundi Large",
      originalPrice: 699,
      discount: '30%',
      sale: 380,
      sizes: ['L'],
      offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
      sku: 'GLAT123',
      details: {
        Material: 'Virgin Quality Brass',
        Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
        About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya...'
      }
    }
  ]
};

const seedProductCatalog = async () => {
  try {
    const categories = await CategoryCollection.find();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    for (const categoryName in productCatalog) {
      const items = productCatalog[categoryName];
      for (const item of items) {
        if (!categoryMap[categoryName]) {
          console.warn(`❌ Category not found: ${categoryName}`);
          continue;
        }

        const productData = {
          ...item,
          category: categoryMap[categoryName],
          subcategory: item.category,
          isSeeded: true
        };

        await Product.updateOne(
          { name: item.name },
          { $set: productData },
          { upsert: true }
        );
      }
    }

    console.log('✅ Product catalog seeded (non-destructive)');
  } catch (error) {
    console.error('❌ Error seeding product catalog:', error.message);
  }
};

module.exports = seedProductCatalog;