export const requestError = (type, error) => ({
  type: type,
  error
});

export const fetchSuccess = (type, data) => {
  return {
      type: type,
      payload: data
  }
};

export const requestData = (type) => ({
  type: type,
});