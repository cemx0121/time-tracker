export const validateRegisterFormData = (formData) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    streetName,
    streetNo,
    postalCode,
    city,
    imagePath,
    hiredDate,
    jobPositionId,
  } = formData;

  const newErrors = {};

  // Validate firstName
  if (validateName(firstName)) {
    newErrors.firstName =
      "First name must be filled with at least 2 characters and no digits";
  }

  // Validate lastName
  if (validateName(lastName)) {
    newErrors.lastName =
      "Last name must be filled with at least 2 characters and no digits";
  }

  // Validate email
  if (validateEmail(email)) {
    newErrors.email =
      "Please enter a valid email address with the domain @green.ai";
  }

  // Validate phone number
  if (!validateOnlyNumbersAndFixedLength(phoneNumber, 8)) {
    newErrors.phoneNumber =
      "Please enter a phone number consisting of 8 digits";
  }

  // Validate password
  if (validatePassword(password)) {
    newErrors.password =
      "Password must be at least 8 characters long, include uppercase and lowercase letters, and contain a digit";
  }

  // Validate street name
  if (validateOnlyLetters(streetName)) {
    newErrors.streetName =
      "Street name must only contain letters and cannot be empty";
  }

  // Validate street no
  if (!validateOnlyNumbersAndFixedLength(streetNo)) {
    newErrors.streetNo =
      "Street number cannot be empty and must only be digits";
  }

  // Validate postalCode
  if (!validateOnlyNumbersAndFixedLength(postalCode, 4)) {
    newErrors.postalCode = "Postal Code cannot be empty and must be 4 digits";
  }

  // Validate city
  if (validateOnlyLetters(city)) {
    newErrors.city = "City must only contain letters and cannot be empty";
  }

  // Validate imagePath
  if (checkIfEmpty(imagePath)) {
    newErrors.imagePath = "Image Path cannot be empty";
  }

  // Validate hiredDate
  if (validateDate(hiredDate)) {
    newErrors.hiredDate = "Please enter a valid hired date";
  }

  // Validate jobPositionId
  if (!jobPositionId) {
    newErrors.jobPositionId = "Please select a job position";
  }

  return newErrors;
};

function containsNonAlphabeticalChars(str) {
  // This regular expression matches any character that is not a standard English letter,
  // Danish letters, or a space.
  const regex = /[^a-zA-ZæøåÆØÅ ]/;

  return regex.test(str);
}

function checkIfEmpty(str) {
  return !str || str.trim().length === 0;
}

function validateNotEmptyAndMinLength(str, minLength) {
  return checkIfEmpty(str) || str.trim().length < minLength;
}

function validateName(str) {
  return (
    validateNotEmptyAndMinLength(str, 2) || containsNonAlphabeticalChars(str)
  );
}

function validateEmail(str) {
  return checkIfEmpty(str) || !/\S+@green\.ai$/.test(str.trim());
}

function validatePassword(str) {
  return (
    validateNotEmptyAndMinLength(str, 8) ||
    !/[a-z]/.test(str) ||
    !/[A-Z]/.test(str) ||
    !/\d/.test(str)
  );
}

function validateDate(date) {
  return checkIfEmpty(date) || new Date(date).toString() === "Invalid Date";
}

function validateOnlyLetters(str) {
  return containsNonAlphabeticalChars(str) || checkIfEmpty(str);
}

function validateOnlyNumbersAndFixedLength(str, fixedLength) {
  let regex;
  if (fixedLength !== undefined) {
    // Check for a fixed length of digits
    regex = new RegExp(`^\\d{${fixedLength}}$`);
  } else {
    // Check for only digits, any length
    regex = /^\d+$/;
  }
  return regex.test(str);
}
