
// Controlla se l'email è valida
const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Controlla se la password è valida
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Controlla se il codice fiscale è valido
  const isTaxIDValid = (taxID) => {
    const cfRegex = /^[A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-Z]\d{3}[A-Z]$/;
    return cfRegex.test(taxID) && taxID.length === 16;;
  };
  
  // Controlla la lunghezza del nome e del cognome
  const isNameValid = (name) => name.length >= 3;
  
  // Funzione per effettuare tutti i controlli sull'utente
   const userChecks = (user) => {
    if (!isEmailValid(user.email)) {
      alert("Email is not valid");
      return false;
    }
  
    if (!isPasswordValid(user.password)) {
      alert("Password is not valid, you need at least 1 capital letter, 1 number and one special character");
      return false;
    }
  
    if (!isTaxIDValid(user.taxID)) {
      alert("TaxID is not valid");
      return false;
    }
  
    if (!isNameValid(user.firstName) || !isNameValid(user.lastName)) {
      alert("Name or surname are too short, you need at least 3 characters");
      return false;
    }
  
    return true;
  };


 
  
  export default userChecks;
  