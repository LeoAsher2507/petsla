export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token: string | null) => {
  if (!!token) return localStorage.setItem("accessToken", token);
};

export const removeAccessToken = () => {
  return localStorage.removeItem("accessToken");
};
