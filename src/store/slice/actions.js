// actions.js
import axios from 'axios'

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:8080/ExoBankRest/rest/UserRest/findAllUser');
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
    }
  };
};

