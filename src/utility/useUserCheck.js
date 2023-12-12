import { useDispatch } from "react-redux"
import { resetUser } from "../store/slice/userSlice"
import { LOGIN } from "./Rotte"
import { useHistory } from "react-router-dom"

function useUserCheck() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);

  const userCheck = () => {
    if (user.roleID?.roleID !== 1) {
      dispatch(resetUser());
      history.push(LOGIN);
    }
  };

  return userCheck;
}

export default useUserCheck;