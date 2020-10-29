export const stripSensitiveProperties = <T>(obj: T) => {
  const newObj: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('_')) continue;
    newObj[key] = value;
  }

  return newObj;
};
