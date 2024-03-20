export function formatPhoneNumber(inputNumber: string = "") {
  // Remove any non-numeric characters from the input
  const cleanedNumber = inputNumber.replace(/\D/g, "");

  // Check if the cleaned number has the correct length
  if (cleanedNumber.length !== 12) {
    return inputNumber;
  }

  // Split the cleaned number into parts
  const countryCode = cleanedNumber.slice(0, 3);
  const operatorCode = cleanedNumber.slice(3, 5);
  const firstPart = cleanedNumber.slice(5, 8);
  const secondPart = cleanedNumber.slice(8, 10);
  const thirdPart = cleanedNumber.slice(10);

  // Create the formatted phone number string
  const formattedNumber = `+${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;

  return formattedNumber;
}
