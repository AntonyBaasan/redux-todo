export const loadState = () => {
  try {
    const persistedData = localStorage.getItem('state');
    if (persistedData === null) {
      return undefined;
    }
    return JSON.parse(persistedData);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem('state', serializedData);
  } catch (error) {
    // might do something later
  }
};
