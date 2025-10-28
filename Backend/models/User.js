// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // Add these two fields

//   cart: [
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'ProductCollection', // ✅ this must match your product model name
//       required: true
//     },
//     quantity: { type: Number, default: 1 },
//     price: { type: Number, default: 0 } // optional if you want to store price snapshot
//   }
// ]

// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCollection',
        required: true
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 }
    }
  ]
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);