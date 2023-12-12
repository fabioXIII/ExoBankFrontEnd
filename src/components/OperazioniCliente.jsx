import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { INSERTTRANSACTION, REST_PATH } from '../utility/EndPoint';
import { resetUser } from '../store/slice/userSlice';
import { useDispatch } from 'react-redux';
import { resetBankAccount } from '../store/slice/bankAccountSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CUSTOMER_HOME } from '../utility/Rotte';

function OperazioniCliente() {
    const bankAccount = useSelector(state => state.bankAccount);
    const [transactionType, setTransactionType] = useState('');
    const [amount, setAmount] = useState(0);
    const [targetBankAccount, setTargetBankAccount] = useState('');
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const history = useHistory()

    useEffect(() => {
        if (user && user.roleID && user.roleID.roleID === 1) {
            console.log("correct user logged")
        }
        else {
            dispatch(resetUser());
            dispatch(resetBankAccount())
            history.push("/")
        }

    })

    const transactionTypes = [
        { id: 1, name: 'WITHDRAWAL' },
        { id: 2, name: 'BANK TRANSFER' },
        { id: 3, name: 'DEPOSIT' }
    ];

    const handleTransactionTypeChange = event => {
        const selectedType = transactionTypes.find(type => type.name === event.target.value);
        setTransactionType({...selectedType, name:selectedType.name});
    };

    // Funzione per verificare la precisione dei decimali
function hasValidDecimalPrecision(value) {
    // Converti il valore in stringa
    const valueAsString = value.toString();
  
    // Trova la posizione del separatore decimale "."
    const decimalSeparatorIndex = valueAsString.indexOf('.');
  
    // Se non ci sono decimali o se la lunghezza dei decimali è <= 2, ritorna true
    if (decimalSeparatorIndex === -1 || valueAsString.length - decimalSeparatorIndex - 1 <= 2) {
      return true;
    }
  
    return false;
  }



    const handleSubmit = async event => {
    event.preventDefault();

    const isDeposit = transactionType.name.toUpperCase() === 'DEPOSIT';
    const isValidTransaction = isDeposit || (amount <= bankAccount.balance && amount >= 0 && hasValidDecimalPrecision(amount));

    if (isValidTransaction) {
        const transaction = {
            amount,
            bankAccountID: {
                bankAccountID: bankAccount.bankAccountID
            },
            targetBankAccountID: {
                bankAccountID: transactionType.name.toUpperCase() === 'BANK TRANSFER' ? targetBankAccount : null
            },
            transactionDate: null,
            transactionID: null,
            transactionStatusID: {
                transactionStatusID: 1,
            },
            transactionTypeID: {
                transactionTypeID: transactionType.id,
            }
        };

        try {
            const response = await axios.post(REST_PATH + INSERTTRANSACTION, transaction);
            console.log('Risposta dal server:', response.data);
            if(response.status===200){
                alert("Operation successful , waiting for approval")
            }
            
        } catch (error) {
            console.error('Errore durante la richiesta POST:', error);
        }
    } else {
        alert('Insufficient balance, negative amount set or too decimals');
    }
};




    return (
        <form onSubmit={handleSubmit}>
            <div className='card'>
                <div className='select-box' style={{ marginBottom: '10px' }}>
                    <label htmlFor="transactionType">Select Transaction Type:</label>

                    <select id="transactionType" onChange={handleTransactionTypeChange}>
                        <option value="">Select</option>
                        {transactionTypes.map(type => (
                            <option key={type.id} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div >
                {transactionType.name === 'BANK TRANSFER' && (
                    <div style={{ marginTop: '10px' }}>
                        <div className='input-box'>
                            <label htmlFor="targetBankAccount">Target Bank Account:</label>
                            <input
                                type="text"
                                id="targetBankAccount"
                                value={targetBankAccount}
                                onChange={e => setTargetBankAccount(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                )}
                <div style={{ marginBottom: '10px' }}>
                    <br />
                    <hr />
                    <br />
                    <label htmlFor="amount">Amount:</label>
                    <div className='input-box'>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <br />
                    <button type="submit">Submit</button>
                    <br />
                    <button type="submit" onClick={() => history.push(CUSTOMER_HOME)}>Go back</button>
                </div>
            </div>
        </form>

    );
};

export default OperazioniCliente;
