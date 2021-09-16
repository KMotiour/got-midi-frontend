import axios from 'axios'
import {REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    UPDATE_REGISTRATION_SUCCESS_STATUS,
    UPDATE_REGISTRATION_FAIL_STATUS,

    START_EMAIL_VARIFICATION, 
    EMAIL_VARIFICATION_SUCCESS, 
    EMAIL_VARIFICATION_FAIL, 

    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_LOGOUT, 

    FORGET_PASSWORD_REQUEST_START, 
    FORGET_PASSWORD_REQUEST_SUCCESS, 
    FORGET_PASSWORD_REQUEST_FAIL, 

    FORGET_PASSWORD_START, 
    FORGET_PASSWORD_SUCCESS, 
    FORGET_PASSWORD_FAIL, 
    
    CHANGE_PASSWORD_START, 
    CHANGE_PASSWORD_SUCCESSS, 
    CHANGE_PASSWORD_ERROR,
    UPDATE_CHANGE_PASSWORD_SUCCESS_STATUS,} from './ActionType'

    import {CountCartedMusic} from './MsuicAction'
    import {getUserInfo} from './UserAction'

    const config = {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: "Bearer " + res.data.access,
        },
      };


export const login = (fromData) => async (dispatch) => {
    try {
        dispatch({type:AUTH_START})
      await axios.post("http://127.0.0.1:8000/api/token/", fromData, config).then((res) => {
          console.log(res.data.access, "userInfos");

          localStorage.setItem('access_token', res.data.access)
          localStorage.setItem('is_superuser', res.data.is_superuser)

          dispatch({
              type:AUTH_SUCCESS,
              data : res.data
          })


          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + res.data.access,
            },
          };
          dispatch(CountCartedMusic(config))
          dispatch(getUserInfo(config))



        })
        
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      localStorage.removeItem('access_token')
      dispatch({
        type:AUTH_FAIL,
        data:error
      })
    }

};


export const Registration = (fromData) => async (dispatch) => {
    try {
      dispatch({type:REGISTRATION_START})
      await axios.post("http://127.0.0.1:8000/auth/users/",fromData, config).then((res) => {
          
          dispatch({
            type: REGISTRATION_SUCCESS,
            data:res.data
          });
        
        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      console.log(error);
      dispatch({
        type:REGISTRATION_FAIL,
        data:error
      })
    }

}

export const UserActivation = (formData) => async (dispatch) => {
    try {
      
      dispatch({
        type:START_EMAIL_VARIFICATION
      })
      await axios.post("http://127.0.0.1:8000/auth/users/activation/", formData, config).then((res) => {   
      dispatch({
            type: EMAIL_VARIFICATION_SUCCESS
          })
        
        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:EMAIL_VARIFICATION_FAIL,
        data:error
      })
    }

}

export const changePassord = (formDate, config) => async (dispatch) => {
    try {
      dispatch({
        type:CHANGE_PASSWORD_START
      })
  
      await axios.post("http://127.0.0.1:8000/auth/users/set_password/", formDate, config).then((res) => {
          dispatch({
            type: CHANGE_PASSWORD_SUCCESSS,
          });
        
        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:CHANGE_PASSWORD_ERROR,
        data:error
      })
    }

}



export const RequestResetPassword = (email) => async (dispatch) => {
    try {
      dispatch({type:FORGET_PASSWORD_REQUEST_START})
      await axios.post("http://127.0.0.1:8000/auth/users/reset_password/", {email}, config).then((res) => {
          
          dispatch({
            type: FORGET_PASSWORD_REQUEST_SUCCESS,
          });
        
        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:FORGET_PASSWORD_REQUEST_FAIL,
        data:error
      })
    }

}

export const ResetPasswordConfirms = (formDate) => async (dispatch) => {
    try {
      dispatch({type:FORGET_PASSWORD_START})

      await axios.post("http://127.0.0.1:8000/auth/users/reset_password_confirm/", formDate, config).then((res) => {
          dispatch({
            type: FORGET_PASSWORD_SUCCESS
          });
        
        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      console.log(error);
      dispatch({
        type:FORGET_PASSWORD_FAIL,
        data:error
      })
    }

}

      

