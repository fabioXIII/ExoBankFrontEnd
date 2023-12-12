import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/slice/userSlice";
import { resetBankAccount } from "../store/slice/bankAccountSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import profile from "../icons/profile.gif"
import { DETTAGLI_UTENTE } from "../utility/Rotte";
function Navbar() {
    const user = useSelector(state => state.user)
    const [nameUser, setNameUser] = useState('');

    const history = useHistory()
    const dispatch = useDispatch();
    const icon = profile

    useEffect(() => {
        if (user && user.firstName && user.lastName) {
            setNameUser(user.firstName + " " + user.lastName);  // Setta il nome utente
        }

    }, [user])

    const logout = () => {
        dispatch(resetUser());
        dispatch(resetBankAccount())
        history.push("/");
    }
 
    return (
        <>
            {user && Object.keys(user).length > 0 ?
                <nav className="navbar navbar-expand-sm navbar-dark">
                    <img
                        src={icon}
                        width="30"
                        height="30"
                        alt=""
                        className="d-inline-block align-top rounded-circle margin-right-10 margin-left-10" />
                    <a className="navbar-brand ml-2" href="#" data-abc="true">
                        Welcome {nameUser}
                    </a>

                    <div className="end">
                        <div className="collapse navbar-collapse margin-right-10" id="navbarColor02">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link mt-2 margin-right-10" onClick={() => logout()} href="" data-abc="true" id="clicked">
                                        Logout
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => history.push(DETTAGLI_UTENTE)}>User Data </a>
                                </li>
                                {/* <li className="nav-item active">
                                    <a onClick={()=>history.goBack()}className="nav-link mt-2 margin-right-10" href="" data-abc="true" id="clicked">
                                        Go back                                        
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                : <></>}
        </>
    )

}

export default Navbar;