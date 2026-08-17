const BASE_URL = "http://localhost:3000/users";

// Register a new user
export const registerUser = async (userData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

// Login user
export const login = async (email, password) => {
  const response = await fetch(
    `${BASE_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  const users = await response.json();

  return users.length > 0 ? users[0] : null;
};

// Check if email already exists
export const checkEmailExists = async (email) => {
  const response = await fetch(
    `${BASE_URL}?email=${encodeURIComponent(email)}`
  );

  const users = await response.json();

  return users.length > 0;
};

// Get all users
export const getUsers = async () => {

  const response = await fetch(BASE_URL);

  return response.json();

};


// Delete user
export const deleteUser = async (id) => {

  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();

};