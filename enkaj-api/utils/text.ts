export function sanitizeSlug(title: string): string {
  // Remove special characters, commas, and underscores using the replace method
  const withoutSpecialChars = title.replace(/[^\w\s-]/g, "").replace(/_/g, "-");

  const sanitized = withoutSpecialChars
    .replace(/[-\s]+/g, "-") // Replace spaces and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
    .toLowerCase();

  return sanitized;
}

export default function reverseString(str: string): string {
  // Step 1: Convert the string to an array
  let arrayOfChars: string[] = str.split("");

  // Step 2: Reverse the array
  let reversedArray: string[] = arrayOfChars.reverse();

  // Step 3: Convert the array back to a string
  let reversedString: string = reversedArray.join("");

  return reversedString;
}

export function genPswd(length: number = 8): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  let isLowerCase = false;
  let isUpperCase = false;
  let isNumber = false;
  let isSpecialChar = false;

  while (password.length < length) {
    const randomSource = Math.floor(Math.random() * 4);
    let char = "";

    switch (randomSource) {
      case 0:
        char = lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        isLowerCase = true;
        break;
      case 1:
        char = uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        isUpperCase = true;
        break;
      case 2:
        char = numbers.charAt(Math.floor(Math.random() * numbers.length));
        isNumber = true;
        break;
      case 3:
        char = specialChars.charAt(
          Math.floor(Math.random() * specialChars.length)
        );
        isSpecialChar = true;
        break;
    }

    password += char;
  }

  if (!isLowerCase) {
    password =
      password.slice(0, -1) +
      lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  }

  if (!isUpperCase) {
    password =
      password.slice(0, -1) +
      uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  }

  if (!isNumber) {
    password =
      password.slice(0, -1) +
      numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  if (!isSpecialChar) {
    password =
      password.slice(0, -1) +
      specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  }

  return password;
}
