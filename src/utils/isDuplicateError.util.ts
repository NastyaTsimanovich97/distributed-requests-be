export const isDuplicateError = (message: string): boolean => {
  const regexp = /duplicate key/;

  return regexp.test(message);
};
