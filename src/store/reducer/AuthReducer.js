import {REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    UPDATE_REGISTRATION_STATUS,

    START_EMAIL_VARIFICATION, 
    EMAIL_VARIFICATION_SUCCESS, 
    EMAIL_VARIFICATION_FAIL, 

    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_LOGOUT,
    UPDATE_AUTH_STATUS, 

    CHANGE_PASSWORD_START, 
    CHANGE_PASSWORD_SUCCESSS, 
    CHANGE_PASSWORD_ERROR,
    UPDATE_CHANGE_PASSWORD_SUCCESS_STATUS,


    FORGET_PASSWORD_REQUEST_START, 
    FORGET_PASSWORD_REQUEST_SUCCESS, 
    FORGET_PASSWORD_REQUEST_FAIL, 
    UPDATE_FORGET_PASSWORD_REQUEST_STATUS,

    FORGET_PASSWORD_START, 
    FORGET_PASSWORD_SUCCESS, 
    FORGET_PASSWORD_FAIL, 
    
   
   } from '../action/ActionType'

    const initialState = ({
        registrationStart:false,
        registrationSuccessStatus:null,
        registrationFail:null,

        startEmailVarification:false,
        emailVarificationSuccess:false,
        emailVarificationFail:null,


        authStart:false,
        accessToken : localStorage.getItem('access_token'),
        is_superUser: localStorage.getItem('is_superuser'),
        authFail:null,
        
        changePasswordStart:false,
        changePasswordSuccess:false,
        changePasswordFail:null,

        startForgetPasswordRequest:false,
        forgetPasswordRequestSuccess:false,
        forgetPasswordRequestFail:null,
        

        startForgetPassword:false,
        forgetPasswordSuccess:false,
        forgetPasswordFail:null,
    })
    
    
    
    
    
    const AuthReducer = (state = initialState, action) =>{
        switch(action.type){

            case REGISTRATION_START: return {...state, registrationStart:true}
            case REGISTRATION_SUCCESS: return {...state, registrationSuccessStatus:action.data, registrationStart:false, registrationFail:null}
            case REGISTRATION_FAIL: return {...state, registrationFail:action.data, registrationSuccessStatus:null, registrationStart:false}
            case UPDATE_REGISTRATION_STATUS: return{ ...state, registrationSuccessStatus:null, registrationFail:null}
            
            case START_EMAIL_VARIFICATION: return{...state, startEmailVarification:true}
            case EMAIL_VARIFICATION_SUCCESS: return{...state, emailVarificationSuccess:true, startEmailVarification:false, emailVarificationFail:null}
            case EMAIL_VARIFICATION_FAIL: return{...state, emailVarificationSuccess:false, startEmailVarification:false, emailVarificationFail:action.data}
            
            case AUTH_START: return{...state, authStart:true}
            case AUTH_SUCCESS: return{...state, accessToken:action.data.access, is_superUser:action.data.is_superuser.toString(), authStart:false, authFail:null}
            case AUTH_FAIL: return{...state, authFail:action.data, is_superUser:null, authStart:false, accessToken:null}
            case AUTH_LOGOUT: return{...state, accessToken:null, is_superUser:null}
            case UPDATE_AUTH_STATUS : return{...state, authFail:null}
            
            case CHANGE_PASSWORD_START: return{...state, changePasswordStart:true}
            case CHANGE_PASSWORD_SUCCESSS: return{...state, changePasswordStart:false, changePasswordSuccess:true, changePasswordFail:null}
            case CHANGE_PASSWORD_ERROR: return{...state, changePasswordStart:false, changePasswordSuccess:false, changePasswordFail:action.data}
            case UPDATE_CHANGE_PASSWORD_SUCCESS_STATUS: return{...state, changePasswordStart:false, changePasswordSuccess:false, changePasswordFail:null}
    
            
            case FORGET_PASSWORD_REQUEST_START: return{...state, startForgetPasswordRequest:true} 
            case FORGET_PASSWORD_REQUEST_SUCCESS: return{...state, forgetPasswordRequestSuccess:true, startForgetPasswordRequest:false, forgetPasswordRequestFail:null} 
            case FORGET_PASSWORD_REQUEST_FAIL: return{...state, forgetPasswordRequestFail:action.data, forgetPasswordRequestSuccess:false, startForgetPasswordRequest:false} 
            case UPDATE_FORGET_PASSWORD_REQUEST_STATUS: return{...state, forgetPasswordRequestFail:null, forgetPasswordRequestSuccess:false}

            case FORGET_PASSWORD_START: return{...state, startForgetPassword:true} 
            case FORGET_PASSWORD_SUCCESS: return{...state, forgetPasswordSuccess:true, startForgetPassword:false, forgetPasswordFail:null} 
            case FORGET_PASSWORD_FAIL: return{...state, forgetPasswordFail:action.data, forgetPasswordSuccess:false, startForgetPassword:false}
            
            default: return state
    
        }
    
    }
    
    export default AuthReducer;