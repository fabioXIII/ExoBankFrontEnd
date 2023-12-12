import React, { useEffect } from 'react'
import { FINDALLBANKACC, REST_PATH, UPDATEBANKACCSTATUS } from '../utility/EndPoint';
import { setListaBankAccount } from '../store/slice/listaBankAccountSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { resetUser } from '../store/slice/userSlice';
import { resetBankAccount } from '../store/slice/bankAccountSlice';
import { LISTA_TRANSAZIONI, LOGIN } from '../utility/Rotte';
import useAdminCheck from '../utility/useAdminCheck';

function AdminHome() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const listaBankAccount = useSelector(state => state.listaBankAccount)
  const history = useHistory()
  const [selectedAccountStatus, setSelectedAccountStatus] = useState('');
  const adminCheck= useAdminCheck();


  useEffect(() => {
    adminCheck()
  }, [])



  useEffect(() => {

    axios.get(REST_PATH + FINDALLBANKACC)
      .then(response => {
        console.log(response.data)
        dispatch(setListaBankAccount(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }, [selectedAccountStatus])

  const handleStatusChange = (bankAccountID, newStatus) => {
    let updatedAccountStatusID = null;
    setSelectedAccountStatus(newStatus);

    if (newStatus === "ACTIVE") {
      updatedAccountStatusID = 2;
    } else if (newStatus === "SUSPENDED") {
      updatedAccountStatusID = 1;
    } else if (newStatus === "DEACTIVATED") {
      updatedAccountStatusID = 3;
    }

    // Trova il bank account corrispondente all'ID
    const selectedBankAccount = listaBankAccount.find(bankAccount => bankAccount.bankAccountID === bankAccountID);

    if (!selectedBankAccount) {
      console.error('Bank account not found.');
      return;
    }

    // Crea l'oggetto bank account aggiornato con il nuovo status
    const updatedBankAccount = {
      ...selectedBankAccount,
      // accountStatus: undefined,  // Rimuovi il campo accountStatus
      accountStatusID: {
        id: updatedAccountStatusID,
        status: newStatus
      }
    };

    // Invia l'oggetto bank account aggiornato al server
    axios.put(REST_PATH + UPDATEBANKACCSTATUS, updatedBankAccount)
      .then(response => {
        console.log(response.data);
        console.log('Stato dell\'account aggiornato con successo.');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(resetBankAccount())
    history.push('/');
  };



  return (
    <div>
      <h1>Benvenuto {user.firstName} , {user.lastName}</h1>

      <table>
        <thead>
          <tr>
            <th>Bank Account ID</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Tax ID</th>
            <th>Account Status</th>
            <th>Status change</th>
          </tr>
        </thead>
        <tbody>
          {listaBankAccount &&
            listaBankAccount.map((bankAccount) => (
              <tr key={bankAccount.bankAccountID}>
                <td>{bankAccount.bankAccountID}</td>
                <td>{bankAccount.accountNumber}</td>
                <td>{bankAccount.balance}</td>
                <td>{bankAccount.userID ? bankAccount.userID.userID : 'N/A'}</td>
                <td>{bankAccount.userID ? bankAccount.userID.firstName : 'N/A'}</td>
                <td>{bankAccount.userID ? bankAccount.userID.lastName : 'N/A'}</td>
                <td>{bankAccount.userID ? bankAccount.userID.taxID : 'N/A'}</td>
                <td>{bankAccount.accountStatusID ? bankAccount.accountStatusID.status : 'N/A'}</td>
                <td>
                  <select
                    value={bankAccount.accountStatusID ? bankAccount.accountStatusID.status : 'N/A'}
                    onChange={(e) => handleStatusChange(bankAccount.bankAccountID, e.target.value)}
                  >
                    <option value="SUSPENDED">Suspended</option>
                    <option value="ACTIVE">Active</option>
                    <option value="DEACTIVATED">Deactivated</option>
                  </select>
                </td>

              </tr>
            ))}


        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <button onClick={() => history.push(LISTA_TRANSAZIONI)}>Go to transactions list</button>
      <button onClick={handleLogout}>LOGOUT</button>

    </div>
  );



}

export default AdminHome;