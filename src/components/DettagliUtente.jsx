import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REST_PATH, UPDATEUSER } from '../utility/EndPoint';
import { resetUser, setUser } from '../store/slice/userSlice';
import userChecks from '../utility/utils';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/';
import { CUSTOMER_HOME, LOGIN } from '../utility/Rotte';

function DettagliUtente() {
    const user = useSelector(state => state.user)
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history= useHistory();
    const dispatch = useDispatch()

   


    useEffect(()=>{
        if (!user || !user.userID) {
            dispatch(resetUser())
            history.push(LOGIN)
        }
    },[])

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("password and confirm password doesn't match")
            return;
        }

        else {
            console.log("Correct Data")
            const updatedUser = {
                ...user,
                email: email,
                password: password

            }
            //controllo le credenziali grazie alla funzione importata con le regex
            const isValid = userChecks(updatedUser)
            if (!isValid) {
                alert("incorrect data")
                return;
            }
            else {
                console.log("correct data ")
                axios.put(REST_PATH + UPDATEUSER, updatedUser)
                    .then(response => {

                        dispatch(setUser(updatedUser))
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className='card2' style={{ flex: 1, marginRight: '2%', display: 'flex' }}>
                <h2>User data</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label-dettagli" htmlFor="email">New Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} className='input-dettagli' />
                    </div>
                    <div>
                        <label className="label-dettagli" htmlFor="password">New Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password" value={password} onChange={handlePasswordChange} className='input-dettagli' />
                        <input
                            type="checkbox"
                            id="showPasswordCheckbox"
                            checked={showPassword}
                            onChange={toggleShowPassword}
                            className="show-password-checkbox"
                            
                        />
                        <label htmlFor="showPasswordCheckbox" className="show-password-label">
                            Show Password
                        </label>
                    </div>
                    <div>
                        <label className="label-dettagli" htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} className='input-dettagli' />
                    </div>
                   
                </form>
            </div>


            <div className='card2' style={{ flex: 1, display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <h3>User data:</h3>
                    <p>Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Tax ID: {user.taxID}</p>
                    <p>Email  : {user.email}</p>
                    <br />
                </div>
                <button type="submit" onClick={handleSubmit} >Submit changes</button>
                <br />
                <button id="go-back" onClick={()=> history.push(CUSTOMER_HOME)} >Go Back</button>

            </div>
        </div>
    );
}
export default DettagliUtente;