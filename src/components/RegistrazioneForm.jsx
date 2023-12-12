import React, { useState } from 'react';
import axios from 'axios';
import { REGISTER, REST_PATH } from '../utility/EndPoint';
import userChecks from '../utility/utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import { CUSTOMER_HOME } from '../utility/Rotte';
function RegistrazioneForm() {

  
  const history = useHistory()
  const dispatch = useDispatch();


  const [user, setUser1] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    taxID: ''
  });
  //costruisco l user con i dati del form con l handlechange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser1({
      ...user,
      [name]: value
    });
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const userJson = JSON.stringify(user);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

   //Controllo dati inseriti tramite Regex
   const isValid =userChecks(user);

   if(!isValid){
    console.log("Data not valid")
    return;
   }
   else{
    console.log("Valid data")
    alert("Registration successful, waiting for approval")
   }
   //assegno il RoleID per settare l user nello stato globale
   
   const userWithRoleID ={
    ...user,
    roleID:{roleID:1}
   }
    axios.post(REST_PATH + REGISTER, userJson, config)
      .then(response => {

        console.log('Dati del form inviati:', response.data);
        dispatch(setUser(userWithRoleID))
      })
      .catch(error => {
        console.log("error" + error)
        console.log(error.response)
      })
  };

  return (
    <form>
      <div className='card' >
      <div >
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="taxId">Tax ID:</label>
        <input type="text" id="taxID" name="taxID" value={user.taxID} onChange={handleChange} />
      </div>
      <button onClick={handleFormSubmit}>Submit</button>
      <br />
      <button onClick={()=>history.push(CUSTOMER_HOME)}>Go back to home</button>
      </div>
    </form>
    
  );
}

export default RegistrazioneForm;
