const mongoose = require('mongoose');
 const User = require('../models/User');
const productCollectionSchema = require('../models/ProductCollection');


exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log('Received productId:', productId);

    const quantity = Math.max(1, Number(req.body.quantity) || 1);
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await productCollectionSchema.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingIndex = user.cart.findIndex(item =>
      item.product.equals(productId)
    );

    if (existingIndex !== -1) {
      user.cart[existingIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    console.log('Cart before save:', JSON.stringify(user.cart, null, 2));
    await user.save();

    await user.populate('cart.product');
    res.json({ cart: user.cart });
  } catch (err) {
    console.error('Add to cart error:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
exports.getCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    // ✅ Use User model directly to test populate
    const user = await User.findById(req.user._id).populate({
      path: 'cart.product',
       model: 'ProductCollection', 
      select: 'name price image description'
    });

    console.log('Populated cart:', JSON.stringify(user.cart, null, 2)); // 🔍 Debug line

    const enrichedCart = user.cart
      .filter(item => item.product)
      .map(item => ({
        _id: item.product._id,
        quantity: item.quantity,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        description: item.product.description
      }));

    res.json({ cart: enrichedCart });
  } catch (err) {
    console.error('Cart fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    console.log('backend delete',userId,productId)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { product: productId } } },
      { new: true }
    ).populate({
      path: 'cart.product',
      model: 'ProductCollection',
      select: 'name price image description'
    });

    res.json({ cart: updatedUser.cart });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } }, // ✅ Clear the cart array
      { new: true }
    );

    res.json({ message: 'Cart cleared successfully', cart: updatedUser.cart });
  } catch (err) {
    console.error('Clear cart error:', err.message);
    res.status(500).json({ message: 'Failed to clear cart', error: err.message });
  }
};
