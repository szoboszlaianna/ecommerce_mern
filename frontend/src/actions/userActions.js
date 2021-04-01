import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCCESS, USER_UPDATE_FAIL, USER_UPDATE_SUCCCESS, USER_UPDATE_RESET, USER_UPDATE_REQUEST, USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCCESS, USER_LIST_FAIL } from '../contants/userConstants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../contants/orderConstants';

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
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/users', { name, email, password }, config);
    dispatch({
      type: USER_REGISTER_SUCCCESS,
      payload: data
    });
    dispatch({
      type: USER_LOGIN_SUCCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAILS_SUCCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/users`, config);
    dispatch({
      type: USER_LIST_SUCCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
