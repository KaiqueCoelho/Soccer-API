const throwCustomError = (name: string, message: string): Error => {
  const err = new Error();
  err.name = name;
  err.message = message;
  throw err;
};

export default throwCustomError;
