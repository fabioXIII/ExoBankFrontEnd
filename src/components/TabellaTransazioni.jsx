import React, { useState } from 'react';
import { camelCaseToWords } from '../utility/utils2';

function TabellaTransazioni({ transactions, colonne, handleApproveClick }) {
    const [orderBy, setOrderBy] = useState('transactionID');


    const handleOrderByChange = (event) => {
        const newOrderBy = event.target.value;
        setOrderBy(newOrderBy);
        // onOrderByChange(newOrderBy);
    };

    const sortedtransactions = [...transactions].sort((a, b) => {
        switch (orderBy) {
            case 'transactionDate':
                return new Date(b.transactionDate) - new Date(a.transactionDate);
            case 'transactionType':
                return a.transactionTypeID.transactionTypeName.localeCompare(b.transactionTypeID.transactionTypeName);
            case 'transactionStatus':
                return b.transactionStatusID.transactionStatusName.localeCompare(a.transactionStatusID.transactionStatusName);
            case 'amount':
                return b.amount - a.amount;
            case 'bankAccountID':
                return a.bankAccountID - b.bankAccountID;
            case 'targetBankAccountID':
                if (a.targetBankAccountID === null || b.targetBankAccountID === null) {
                    if (a.targetBankAccountID === null && b.targetBankAccountID !== null) {
                        return 1;
                    } else if (a.targetBankAccountID !== null && b.targetBankAccountID === null) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
                return a.targetBankAccountID.bankAccountID - b.targetBankAccountID.bankAccountID;
            default:
                return a.transactionID - b.transactionID;
        }
    });
    
    function getValueFromNestedProperty(obj, key) {
        const keys = key.split('.'); // Dividi la chiave in caso sia annidata
        let value = obj;

        for (let k of keys) {
            value = value[k];
            if (value === undefined) return 'N/A'; // Gestione della non esistenza della proprietà
        }

        return value;
    }

    function mappatransactions(transactions) {
        return transactions.map(transaction => ({
            transactionID: transaction.transactionID,
            transactionDate: new Date(transaction.transactionDate).toLocaleString(),
            amount: transaction.amount,
            transactionType: transaction.transactionTypeID.transactionTypeName,
            transactionStatus: transaction.transactionStatusID.transactionStatusName,
            bankAccountID: transaction.bankAccountID.bankAccountID,
            targetBankAccountID: transaction.targetBankAccountID ? transaction.targetBankAccountID.bankAccountID : 'N/A'
            // Aggiungi altre colonne se necessario, con i valori corrispondenti
        }));
    }
    const transactionsMappati = mappatransactions(sortedtransactions);


    return (

        <div>
            <label htmlFor="orderBy">Order By:</label>
            <div className="select-box">
                <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
                    <option value="">None</option>
                    {colonne.map((colonna) => (
                        <option key={colonna} value={colonna}>
                            {camelCaseToWords(colonna)}
                        </option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        {colonne.map((colonna) => (
                            <th key={colonna}>{camelCaseToWords(colonna)}</th>
                        ))}
                        <th>Action</th> {/* Aggiungi una colonna extra per l'azione */}

                    </tr>
                </thead>

                <tbody>
                    {transactionsMappati.map((transaction) => (
                        <tr key={transaction.transactionID}>
                            {colonne.map((colonna) => (
                                <td key={colonna}>
                                    {getValueFromNestedProperty(transaction, colonna)}
                                </td>
                            ))}
                            <td> {/* Colonna extra per l'azione */}
                                {transaction.transactionStatus === 'SUSPENDED' && (
                                    <button
                                        style={{ display: 'block' }}
                                        onClick={() => handleApproveClick(transaction.transactionID)}
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
        </div>
    );
}

export default TabellaTransazioni;
