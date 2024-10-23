function CatchAsyncError(isFunc) {
    return (req, res, next) => {
      Promise.resolve(isFunc(req, res, next)).catch(next);
    };
  }
  
  module.exports = CatchAsyncError;