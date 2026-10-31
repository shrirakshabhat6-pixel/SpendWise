
// Save data
export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Get data
export const getData = (key, defaultValue = []) => {
  const storedData = localStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : defaultValue;
};

// Remove data
export const removeData = (key) => {
  localStorage.removeItem(key);
};