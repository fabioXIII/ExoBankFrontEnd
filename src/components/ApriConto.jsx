import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { INSERTBANKACC, REST_PATH } from '../utility/EndPoint';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '../store/slice/userSlice';
import { resetBankAccount } from '../store/slice/bankAccountSlice';
import axios from 'axios';
import { CUSTOMER_HOME } from '../utility/Rotte';

function ApriConto() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    useEffect(()=>{
        if(user && user.roleID && user.roleID.roleID === 1){
            console.log("correct user logged")
        }
        else{
            dispatch(resetUser());
            dispatch(resetBankAccount());
            history.push("/")
        }

    },[])


  
      
        const confermaRichiesta = () => {
          axios.post(REST_PATH+ INSERTBANKACC ,user)
          .then(response=>{
            console.log('dati inviati')
          })
          .catch(error=>{
            console.log(error)
          })
          history.push(CUSTOMER_HOME);
        };
    return  (
        <div >
          <h2>Dettagli Utente</h2>
          <form>
            <div className='input-box2'>
              <label htmlFor="userID">User ID:</label>
              <input type="text" id="userID" value={user.userID} readOnly />
            </div>
            <div className='input-box2'>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" value={user.firstName} readOnly />
            </div>
            <div className='input-box2'>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" value={user.lastName} readOnly />
            </div>
            <div className='input-box2'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={user.email} readOnly />
            </div>
            <div className='input-box2'>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={user.password} readOnly />
            </div>
            <div className='input-box2'>
              <label htmlFor="roleID">Role ID:</label>
              <input type="text" id="roleID" value={user.roleID.roleID} readOnly />
            </div>
            <div className='input-box2'>
              <label htmlFor="taxID">Tax ID:</label>
              <input type="text" id="taxID" value={user.taxID} readOnly />
            </div>
          </form>
          <button onClick={confermaRichiesta}>Confirm request new BankAccount</button>
          <button onClick={() => history.push(CUSTOMER_HOME)}>Go back to home</button>
        </div>
      );
    }

export default ApriConto