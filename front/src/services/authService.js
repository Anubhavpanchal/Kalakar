export const signupUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if email already exists
  const userExists = users.some((user) => user.email === userData.email);
  if (userExists) {
    return { success: false, message: 'User already exists' };
  }

  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, message: 'Signup successful' };
};

export const loginUser = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, message: 'Login successful', user };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};