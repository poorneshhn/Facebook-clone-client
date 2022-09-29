export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    value.length === 0 ||
    typeof value === "undefined"
  );
};

export const isEmptyJson = (value) => {
  return Object.keys(value).length === 0;
};
