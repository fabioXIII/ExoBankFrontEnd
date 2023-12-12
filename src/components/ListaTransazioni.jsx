import React, { useEffect } from 'react'
import axios from 'axios'
import { FINDALLTRANSACTIONS, REST_PATH, UPDATETRANSACTIONSTATUS } from '../utility/EndPoint'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { resetUser } from '../store/slice/userSlice';
import { resetBankAccount } from '../store/slice/bankAccountSlice';
import { ADMIN_HOME, LANDING_ADMIN } from '../utility/Rotte';
import FiltroTransazioni from './FiltroTransazioni';
import TabellaTransazioni from './TabellaTransazioni';
function ListaTransazioni() {
  const [transactionsList, setTransactionsList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const [orderBy, setOrderBy] = useState('transactionID');
  const colonne =['transactionID' , 'transactionDate', 'amount' ,'transactionType','transactionStatus', 'bankAccountID', 'targetBankAccountID'];

  //Filtro delle transazioni 
  
  const sortedTransactions = [...transactionsList].sort((a, b) => {
    if (orderBy === 'transactionDate') {
      return new Date(b.transactionDate) - new Date(a.transactionDate);
    } else if (orderBy === 'transactionTypeName') {
      return a.transactionTypeID.transactionTypeName.localeCompare(b.transactionTypeID.transactionTypeName);
    } else if (orderBy === 'transactionStatusName') {
      return b.transactionStatusID.transactionStatusName.localeCompare(a.transactionStatusID.transactionStatusName);
    } else {
      // Ordina per transactionID come default
      return a.transactionID - b.transactionID;
    }
  });

  const handleOrderByChange =(event)=>{
    setOrderBy(event.target.value)
  }
  useEffect(() => {
    if (user && user.roleID && user.roleID.roleID === 2) {
      axios.get(REST_PATH + FINDALLTRANSACTIONS)
        .then(response => {
          setTransactionsList(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    else {
      dispatch(resetUser());
      dispatch(resetBankAccount());
      history.push("/")
    }


  }, [])

  const handleApproveClick = (transactionID) => {
    const transactionToApprove = transactionsList.find(transaction => transaction.transactionID === transactionID);
    if (transactionToApprove) {
      // Aggiorna il tipo di transazione a "confirmed"
      const updatedTransaction = {
        ...transactionToApprove,
        transactionStatusID: {
          transactionStatusID: 2, // Stato confermato
          transactionStatusName: 'CONFIRMED'
        }
      };
      const transactionIndex = transactionsList.findIndex(transaction => transaction.transactionID === transactionID);

      if (transactionIndex !== -1) {
        // Crea una nuova lista con la transazione aggiornata
        const updatedTransactionsList = [...transactionsList];
        updatedTransactionsList[transactionIndex] = updatedTransaction;

        setTransactionsList(updatedTransactionsList);

        axios.put(REST_PATH + UPDATETRANSACTIONSTATUS, updatedTransaction)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })


        console.log('Transaction approved:', transactionID);
      } else {
        console.error('Transaction not found:', transactionID);
      }
    }

  }


  return (
    <div className='table-container'>
      
      <TabellaTransazioni 
      transactions={sortedTransactions}
      colonne={colonne}
      onOrderByChange={handleOrderByChange}
      handleApproveClick={handleApproveClick}/>
      <hr />
      
      <button onClick={() => history.push(ADMIN_HOME)}>Go back to home</button>

      <button onClick={() => history.push(LANDING_ADMIN)}>Go back Find</button>



    </div>

  )
}

export default ListaTransazioni