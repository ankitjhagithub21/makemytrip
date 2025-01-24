const asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
};

module.exports = asyncHandler