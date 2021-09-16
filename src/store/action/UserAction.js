import axios from 'axios'
import {
    GET_USER_INFO_START,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,

    UPDATE_USER_INFO_START,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,

} from './ActionType'


export const getUserInfo = (config) => async (dispatch) => {
   

    try {
        dispatch({type:GET_USER_INFO_START})

            await axios.get("http://127.0.0.1:8000/user/useinfo", config).then((res) => {
                dispatch({
                    type:GET_USER_INFO_SUCCESS,
                    data : res.data
                })
      
              })
        
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:GET_USER_INFO_FAIL,
        data:error
      })
    }
};


export const updateUserInfo = (id, formData, config) => async (dispatch) => {
   
    try {
        dispatch({type:UPDATE_USER_INFO_START})

            await axios.patch(`http://127.0.0.1:8000/user/${id}/`,formData, config).then((res) => {
                console.log('updated');
                dispatch({
                    type:UPDATE_USER_INFO_SUCCESS,
                })
                dispatch(getUserInfo(config))
      
              })
        
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:UPDATE_USER_INFO_FAIL,
        data:error
      })
    }

};

