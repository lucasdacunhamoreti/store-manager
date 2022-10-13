const verifyError = (error) => {
  switch (error) {
    case '"productId" is required':
      return { code: 400, error };
    case '"quantity" is required':
      return { code: 400, error };
    case '"quantity" must be greater than or equal to 1':
      return { code: 422, error };
    default:
      return null;
  }
};

module.exports = { verifyError };
