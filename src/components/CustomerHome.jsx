import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { resetUser } from '../store/slice/userSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FINDBANKACCID, REST_PATH } from '../utility/EndPoint';
import { useEffect } from 'react';
import axios from 'axios';
import bankAccountSlice, { resetBankAccount, setBankAccount } from '../store/slice/bankAccountSlice';
import CreditCard from './CreditCard';
import { APRI_CONTO, OPERAZIONI_CLIENTE, TRANSAZIONI_CLIENTE } from '../utility/Rotte';
function CustomerHome() {
  const user = useSelector(state => state.user);
  const bankAccount = useSelector(state => state.bankAccount);
  // const [isChildComponentVisible, setIsChildComponentVisible] = useState(false);

  console.log('Bank Account State:', bankAccount);


  const dispatch = useDispatch();
  const history = useHistory();

  // const handleToggleChildComponent = () => {
  //   setIsChildComponentVisible(prev => !prev);
  // };


  useEffect(() => {

    if (user && user.roleID && user.roleID.roleID === 1) {
      axios.post(REST_PATH + FINDBANKACCID, user)

        .then(response => {
          console.log(response.data)
          dispatch(setBankAccount(response.data))
        }).catch(error => {
          console.log(error)
        })
    }
    else {
      dispatch(resetUser());
      dispatch(resetBankAccount());
      history.push("/")
    }


  }, [user?.userID])

  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(resetBankAccount())
    history.push('/');
  };
  return (
    <div className='container'>

      <h1>Benvenuto {user.firstName}</h1>
      <br />

      {bankAccount && bankAccount.accountStatusID.status !== 'ACTIVE' && (
        <h3>Account awaiting approval.</h3>

      )}
      <div className='card'>

        {bankAccount ? (
          <div className='bank-account-info'>
            <h2>Dati del Bank Account:</h2>
            <p>Account number: {bankAccount.accountNumber}</p>
            <p>Balance: {bankAccount.balance}</p>
            <p>Account Status: {bankAccount.accountStatusID.status}</p>
          </div>
        ) : (
          <p>No bank account information available.</p>
        )}

        <button className="submit-button" onClick={handleLogout}>

          LogOut
        </button>
        <br />

        {!bankAccount && (
          <button className="submit-button" onClick={() => history.push(APRI_CONTO)}>
            Open new BankAccount
          </button>
        )}
        <br />
        <button
          onClick={() => history.push(OPERAZIONI_CLIENTE)}
          disabled={bankAccount && bankAccount.accountStatusID.status !== 'ACTIVE'}
          className={bankAccount && bankAccount.accountStatusID.status !== 'ACTIVE' ? 'disabled-button' : ''}

        >
          Go to transactions
        </button>
        <button onClick={() => history.push(TRANSAZIONI_CLIENTE)}

        >Your movements</button>

        
      </div>
      {/* <button onClick={()=> history.push("/CreditCard")}>Credit Card</button> */}
      {/* <button onClick={handleToggleChildComponent}>Apri il componente figlio</button>
        {isChildComponentVisible && <CreditCard />} */}

    </div>
  );
}

export default CustomerHome