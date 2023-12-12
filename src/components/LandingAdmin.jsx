import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ADMIN_HOME, LISTA_TRANSAZIONI } from '../utility/Rotte'
import { FINDBANKACCID, REST_PATH } from '../utility/EndPoint'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import useAdminCheck from '../utility/useAdminCheck'
function LandingAdmin() {
    const history = useHistory()
    const adminCheck= useAdminCheck();

    const user = useSelector(state => state.user)
    const [userID, setUserID] = useState("")
    const [bankAccount, setBankAccount] = useState(null)

    useEffect(()=>{
        adminCheck()
    },[])
    
    const handleButtonClick = () => {
        
        if(userID<1){
            alert("enter a valid UserID")
            return;
            
        }

        const User={
            userID:userID
        }

        axios.post(REST_PATH + FINDBANKACCID, User)
            .then(response => {
                console.log(response)
                setBankAccount(response.data)
                const bankAccountString =JSON.stringify(bankAccount, null, 2)
                console.log(bankAccountString)
            })
            .catch(error => {
                console.log(error)
            })
    }




    return (
        <div className='card'  style={{ display: 'flex', flexDirection: 'column' }}
        > <h1>Benvenuto {user.firstName} {user.lastName}</h1>
            <label htmlFor="bankAccountId">Search bankAccount from userID:</label>
            <input
                id="userID"
                type="number"
                value={userID}
                onChange={(event) => setUserID(event.target.value)}
            />

            <button onClick={() => history.push(ADMIN_HOME)}>Go to all bank account</button>

            <button onClick={() => history.push(LISTA_TRANSAZIONI)}>Go to all transactions</button>

            <button onClick={handleButtonClick}>Find bank account</button>

            {bankAccount && bankAccount.userID ? (
                <div className='user-details'>
                    <p>UserID: {bankAccount.userID.userID}</p>
                    <p>BankaccountID: {bankAccount.bankAccountID}</p>
                    <p>First name: {bankAccount.userID.firstName}</p>
                    <p>Last name: {bankAccount.userID.lastName}</p>
                    <p>Email: {bankAccount.userID?.email}</p>
                    <p>Balance : {bankAccount.balance}</p>
                    <p>Bank account status: {bankAccount?.accountStatusID?.status}</p>
                    {/* Aggiungi altre informazioni di userSearch qui */}
                </div>
            ) : null}


        </div>






    )
}

export default LandingAdmin;