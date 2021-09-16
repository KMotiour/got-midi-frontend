import {
    GET_USER_INFO_START,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,

    UPDATE_USER_INFO_START,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_SUCCESS_STATUS,
    UPDATE_USER_INFO_FAIL,

 

} from '../action/ActionType'




const initialState = ({
    get_user_info_start:false,
    get_user_info_success:null,
    get_user_info_fail:null,

    update_user_info_start:false,
    update_user_info_success:false,
    update_user_info_fail:null,

})

    
    
const UserReducer = (state = initialState, action) =>{
    switch(action.type){

        case GET_USER_INFO_START: return{...state, get_user_info_start:true}
        case GET_USER_INFO_SUCCESS: return{...state, get_user_info_start:false, get_user_info_success:action.data, get_user_info_fail:null}
        case GET_USER_INFO_FAIL: return{...state, get_user_info_start:false, get_user_info_success:false, get_user_info_fail:action.data}
        
        case UPDATE_USER_INFO_START: return{...state, update_user_info_start:true}
        case UPDATE_USER_INFO_SUCCESS: return{...state, update_user_info_start:false, update_user_info_success:true, update_user_info_fail:null}
        case UPDATE_USER_INFO_SUCCESS_STATUS: return{...state, update_user_info_start:false, update_user_info_success:false, update_user_info_fail:null}
        case UPDATE_USER_INFO_FAIL: return{...state, update_user_info_start:false, update_user_info_success:false, update_user_info_fail:action.data}
        
        default: return state

    }

}

export default UserReducer;