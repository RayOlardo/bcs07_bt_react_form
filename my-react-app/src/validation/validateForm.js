// Validate form rỗng
export const validateForm = (data) => {
  const { id, name, phone, email } = data;
  if (id !== "" && name !== "" && phone !== "" && email !== "") {
    return true;
  }
};
// Validate text
export const validateName = (data) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(data.name);
};
// Validate number
export const validatePhone = (data) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(data.phone);
};

// Validate email
export const validateEmail = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(data.email);
};
