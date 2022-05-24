export const removeDuplicate = (arr) => {
  return arr.filter(
    (value, index, array) =>
      array.findIndex((valueItem) => valueItem.id === value.id) === index
  );
};
