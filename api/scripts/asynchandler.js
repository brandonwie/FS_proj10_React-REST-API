const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      if (
        err.name === "SequelizeValidationError"
      ) {
        err.status = 400;
        next(err);
      } else {
        console.log(err);
        res.status(500).json("Unknown Error");
      }
    }
  };
};

module.exports = asyncHandler;
