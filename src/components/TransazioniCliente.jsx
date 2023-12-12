import React, { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { DOWNLOAD_PDF, FINDUSERTRANSACTIONS, GET_TRANSACTIONS_PDF, REST_PATH } from '../utility/EndPoint'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { CUSTOMER_HOME } from '../utility/Rotte'
import FiltroTransazioni from './FiltroTransazioni'
import TabellaTransazioni from './TabellaTransazioni'
function TransazioniCliente() {

    const [transactions, setTransactions] = useState([])
    const user = useSelector(state => state.user)
    const bankAccount = useSelector(state => state.bankAccount)
    const history = useHistory()
    const [orderBy, setOrderBy] = useState('transactionID');

    const colonne =['transactionID' , 'transactionDate', 'amount' ,'transactionType','transactionStatus', 'bankAccountID', 'targetBankAccountID'];
    const valoriAnnidati = ['.TransactionID', '.TransactionDate', '.amount' , 'transactionTypeID.transactionTypeName' , '.transactionStatusID.transactionStatusName'
                           , '.bankAccountID.bankAccountID' ,'.targetBankAccountID ? transaction.targetBankAccountID.bankAccountID : N/A'];



    const handleOrderByChange =(newOrderBy)=>{
      setOrderBy(newOrderBy)
    }

    useEffect(() => {
        axios.post(REST_PATH + FINDUSERTRANSACTIONS, bankAccount)
            .then(response => {
                setTransactions(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [bankAccount])


    const downloadPdf = () => {
        //trattiamo la risposta come array di byte usando arraybuffer


        axios.post(REST_PATH + DOWNLOAD_PDF, bankAccount, { responseType: 'arraybuffer' })
            .then(response => {
                //creo un oggetto blob dalla response
                const blob = new Blob([response.data], { type: 'application/pdf' });
                //creo url temporaneo per il blob
                const url = window.URL.createObjectURL(blob)
                // Creare un link nascosto e simulo clic su di esso per avviare il download

                const a = document.createElement('a')
                a.href = url
                a.download = 'transactions.pdf'
                document.body.appendChild(a)
                a.click();
                // Pulire dopo il download
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)

            })
            .catch(error => {
                console.log(error)
                alert("error downloadin pdf")
            })



    }

   
    return (
        <div>
            <h1>Transazioni del cliente {user.firstName} , {user.lastName}</h1>
            {/* <TabellaTransazioni dati={transactions}
             colonne={colonne}
             onOrderByChange={handleOrderByChange}
             valoriAnnidati={valoriAnnidati}/> */}
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Transaction Type</th>
                        <th>Transaction Status</th>
                        <th>Bank Account ID</th>
                        <th>Target Bank Account ID</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.transactionID}>
                            <td>{transaction.transactionID}</td>
                            <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transactionTypeID.transactionTypeName}</td>
                            <td>{transaction.transactionStatusID.transactionStatusName}</td>
                            <td>{transaction.bankAccountID.bankAccountID}</td>
                            <td>{transaction.targetBankAccountID ? transaction.targetBankAccountID.bankAccountID : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => downloadPdf()} >Download Pdf</button>

            <button onClick={() => history.push(CUSTOMER_HOME)}>Go back to home</button>

        </div>

    )
}

export default TransazioniCliente