export const stripBlacklistedProperties = <T>(
  obj: T,
  blacklist: (keyof T)[]
): Omit<T, keyof typeof blacklist> => {
  const scrubbedUser: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (blacklist.includes(key as keyof T)) continue;

    scrubbedUser[key] = value;
  }

  return scrubbedUser;
};

export const stripSensitiveProperties = <T>(obj: T): Partial<T> => {
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
