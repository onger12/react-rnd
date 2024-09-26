export const convertKeysToLowerCase = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToLowerCase(item));
  }

  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = key.charAt(0).toLowerCase() + key.slice(1);
      newObj[newKey] = convertKeysToLowerCase(obj[key]);
    }
  }
  return newObj;
}