import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { resetUser, setUser } from '../store/slice/userSlice';
import { LOGIN, REST_PATH } from '../utility/EndPoint';
import { resetBankAccount } from '../store/slice/bankAccountSlice';
import { ADMIN_HOME, CUSTOMER_HOME, LANDING_ADMIN, REGISTRAZIONE_FORM } from '../utility/Rotte';
import LandingAdmin from './LandingAdmin';

const YourLoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState(null);
  const [otpVerificationSuccess, setOtpVerificationSuccess] = useState(false);
  const [localUser , setLocalUser] = useState({})
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user && user?.roleID?.roleID === 1) {
      history.push(CUSTOMER_HOME);
    } else if (user && user?.roleID?.roleID === 2) {
      history.push(LANDING_ADMIN);
    }
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    };

    axios
      .post(REST_PATH + LOGIN, user)
      .then(response => {
        console.log('Login successful! Token:', response.data);
        // dispatch(setUser(response.data));
        //lo metto inizialmente nello stato locale
        setLocalUser(response.data)

        const userOtp = window.prompt("Insert your OTP");
        if (userOtp) {
          setOTP(userOtp);
        } else {
          alert("OTP not provided");
        }
      })
      .catch(error => {
        console.log(error);
        alert("Login failed");
      });
  };

  useEffect(() => {
    if (otp) {
      //creo oggetto con otp e id a backend 
      const VerifyOtpRequest = {
        frontEndOtp: otp,
        userId: localUser.userID  
      };
      axios
        .post(REST_PATH + "/UserRest/verifyOTP" , VerifyOtpRequest)
        .then(response => {
          console.log(response.status);
          if (response.status === 200) {
            setOtpVerificationSuccess(true);
            //lo loggo definitivamente nello stato globale
            dispatch(setUser(localUser))
          } else {
            dispatch(resetUser());
            dispatch(resetBankAccount());
            console.log("OTP verification failed with status 500");
            alert("OTP verification failed");
            history.push("/");
          }
        })
        .catch(error => { 
          
          console.log("Error verifying OTP:", error);
          alert("An error occurred while verifying OTP");
        });
    }
  }, [otp, history, dispatch,localUser.userID]);

  useEffect(() => {
    if (otpVerificationSuccess) {
      const roleId = user.roleID?.roleID;
      if (roleId === 1) {
        history.push(CUSTOMER_HOME);
      } else if (roleId === 2) {
        history.push(LANDING_ADMIN);
      }
    }
  }, [otpVerificationSuccess, user, history]);

  return (
    <div className='card'>
      <div className="login-box">
        <h2>Login</h2>
        <div className="user-box">
          <div className='input-box'>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
        </div>
        <div className="user-box">
          <div className='input-box'>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
        </div>
        <button type='button' href="#" className="submit-button" onClick={handleLogin}>
          Login
        </button>
        <br />
        <hr />
        <button onClick={() => history.push(REGISTRAZIONE_FORM)}>
          Register now
        </button>
      </div>
    </div>
  );
};

export default YourLoginComponent;
