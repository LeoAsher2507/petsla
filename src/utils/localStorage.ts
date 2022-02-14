export const getLocalStorage = (key: string): any => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};

export const setLocalStorage = (key: string, value: any): void => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};
