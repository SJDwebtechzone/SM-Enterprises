const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
 

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 

    const user = await User.findById(decoded.userId);
  

   if (!user || (user.role !== 'admin' && user.role !== 'user')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('❌ Token error:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyAdmin;