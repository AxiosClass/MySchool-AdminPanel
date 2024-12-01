export const removeEmptyProperties = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    if (obj[key]) acc[key] = obj[key];
    return acc;
  }, {});
};
