import { useDispatch, useSelector } from "react-redux"
import { resetUser } from "../store/slice/userSlice"
import { LOGIN } from "./Rotte"
import { useHistory } from "react-router-dom"

function useAdminCheck() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);

  const adminCheck = () => {
    if (user.roleID?.roleID !== 2) {
      dispatch(resetUser());
      history.push(LOGIN);
    }
  };

  return adminCheck;
}

export default useAdminCheck;