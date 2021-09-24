const createApiUrl = (controllerName: string) => {
  return `${API_HOST}/api/${controllerName}`;
};

export const ApiRouting = {
  createApiUrl,
};
