const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).json({ message: 'You are not an admin' });
    }
    next();
  };
  
  module.exports = isAdmin;
  