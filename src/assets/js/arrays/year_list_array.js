// Get the current year
const currentYear = new Date().getFullYear();

// Create an array to store the years
const years = [];

// Loop through the years from the current year to 100 years ago
for (let i = currentYear; i >= currentYear - 100; i--) {
  years.push(i);
}

export default years;