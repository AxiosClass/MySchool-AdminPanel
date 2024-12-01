export const removeEmptyProperties = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    if (obj[key]) acc[key] = obj[key];
    return acc;
  }, {});
};

export const makeQueryUrl = (baseAddress: string, obj: Record<string, any>) => {
  const refinedObj = removeEmptyProperties(obj);
  return Object.keys(refinedObj).reduce((acc: string, key, index) => {
    if (index === 0) acc += `?${key}=${obj[key]}`;
    else acc += `&${key}=${obj[key]}`;
    return acc;
  }, baseAddress);
};
