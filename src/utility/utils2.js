export function camelCaseToWords(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2') // Inserisce uno spazio tra le lettere maiuscole
              .replace(/\b\w/g, c => c.toUpperCase()); // Rende maiuscole le prime lettere di ogni parola
  }