import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCCESS, USER_LOGIN_LOGOUT } from '../contants/userConstants';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch({
      type: USER_LOGIN_SUCCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ USER_LOGIN_LOGOUT });
};
