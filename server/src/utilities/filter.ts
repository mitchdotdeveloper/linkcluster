export const stripSensitiveProperties = <T>(obj: T) => {
  const newObj: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('_')) continue;
    newObj[key] = value;
  }

  return newObj;
};

export const stripFalsyProperties = <T>(obj: T) => {
  const newObj: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue;
    newObj[key] = value;
  }

  return newObj;
};

export const stripNullOrUndefinedProperties = <T>(obj: T) => {
  const newObj: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    newObj[key] = value;
  }

  return newObj;
};
