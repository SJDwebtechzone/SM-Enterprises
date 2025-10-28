const Product = require('../models/Product');



    const products = [
      {
        id:'1',
        name: 'Brass Bell',
        category: 'Brass Bell',
        price: 425,
        originalPrice: 699,
        discount: '30%',
        sale: 380,
        image: 'http://localhost:5000/images/Bell.jpg',
        offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
        sku: 'GLAT123',
        details: {
          Material: 'Virgin Quality Brass',
          Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
          About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya...',
        },
        isSeeded: true

      },
      {
        id: '2',
        name: 'Hundi',
        category: 'Hundi',
        price: 425,
        originalPrice: 699,
        discount: '30%',
        sale: 380,
        image: 'http://localhost:5000/images/Hundi.jpg',
        offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
        sku: 'GLAT123',
        details: {
          Material: 'Virgin Quality Brass',
          Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
          About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya, exclusively handcrafted with attention. Symbolizes beauty and grace. Perfect for religious ceremonies, festive occasions, and spiritual gatherings. Made in India by Satisvitribe.'
        },
        isSeeded: true

      },
      {
        id: '3',
        name: 'Kalasam',
        category: 'Kalasam',
        price: 425,
        originalPrice: 699,
        discount: '30%',
        sale: 380,
        image: 'http://localhost:5000/images/Kalasam.jpg',
        offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
        sku: 'GLAT123',
        details: {
          Material: 'Virgin Quality Brass',
          Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
          About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya, exclusively handcrafted with attention. Symbolizes beauty and grace. Perfect for religious ceremonies, festive occasions, and spiritual gatherings. Made in India by Satisvitribe.'
        },
        isSeeded: true

      },
      {
        id: '4',
        name: 'Steel Vilakku',
        category: 'Steel Vilakku',
        price: 425,
        originalPrice: 699,
        discount: '30%',
        sale: 380,
        image: 'http://localhost:5000/images/Vilakku.jpg',
        offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
        sku: 'GLAT123',
        details: {
          Material: 'Virgin Quality Brass',
          Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
          About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya, exclusively handcrafted with attention. Symbolizes beauty and grace. Perfect for religious ceremonies, festive occasions, and spiritual gatherings. Made in India by Satisvitribe.'
        },
        isSeeded: true

      },
      {
        id: '5',
        name: 'Electric Bell',
        category: 'Electric Bell',
        price: 425,
        originalPrice: 699,
        discount: '30%',
        sale: 380,
        image: 'http://localhost:5000/images/Bellwithsound.jpg',
        offers: ['🎁 Buy 1 Get 5% Off', '🎁 Buy 2 Get 10% Off', '🚚 Free Delivery Above ₹299'],
        sku: 'GLAT123',
        details: {
          Material: 'Virgin Quality Brass',
          Dimensions: 'Height (10 cm), Base (6–7 cm Diameter)',
          About: 'Kerala Samai Deepam with Brass Kerala Peacock Diya, exclusively handcrafted with attention. Symbolizes beauty and grace. Perfect for religious ceremonies, festive occasions, and spiritual gatherings. Made in India by Satisvitribe.'
        },
        isSeeded: true

      },
      // Add other products here...
    ];

    const seedDatabase = async () => {
  try {
    for (const item of products) {
      await Product.updateOne(
        { name: item.name },
        { $set: item },
        { upsert: true }
      );
    }

    console.log('✅ Flat product list seeded (non-destructive)');
  } catch (error) {
    console.error('❌ Error seeding flat product list:', error.message);
  }
};



module.exports = seedDatabase;