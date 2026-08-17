export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const loginUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("currentUser");
};

export const isAdmin = () => {
    const user = getCurrentUser();

    return user?.role === "admin";
};