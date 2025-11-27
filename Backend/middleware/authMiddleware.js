// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('Auth error:', err.message);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authenticateUser;
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateUser = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   console.log('🔐 Token:', token);

//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('✅ Decoded:', decoded);

//     const user = await User.findById(decoded.userId);
//     console.log('👤 User:', user);

//     if (!user) return res.status(403).json({ message: 'User not found' });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error('❌ Auth error:', err.message);
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authenticateUser;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Malformed token' });
    }
    console.error('❌ Auth error:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
