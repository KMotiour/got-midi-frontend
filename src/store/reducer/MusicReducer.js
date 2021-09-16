import {
    GET_TOP_LIST_START,
GET_TOP_LIST_SUCCESS,
GET_TOP_LIST_FAIL,

GET_LATEST_MUSIC_START,
GET_LATEST_MUSIC_SUCCESS,
GET_LATEST_MUSIC_FAIL,

GET_ALL_MUSIC_START,
GET_ALL_MUSIC_SUCCESS,
GET_ALL_MUSIC_FAIL,

ADD_MUSIC_TO_CART_START,
ADD_MUSIC_TO_CART_SUCCESS,
ADD_MUSIC_TO_CART_FAIL,
UPDATE_MUSIC_TO_CART_SUCCESS_STATUS,

COUNT_CARTED_MUSIC_START,
COUNT_CARTED_MUSIC_SUCCESS,
COUNT_CARTED_MUSIC_FAIL,

GET_CART_MUSIC_LIST_START,
GET_CART_MUSIC_LIST_SUCCESS,
GET_CART_MUSIC_LIST_FAIL,

GET_PERCHESEMUSIC_SUCCESS,

GET_PERCHESED_MUSIC_LIST_START,
GET_PERCHESEDUSIC_LIST_SUCCESS,
GET_PERCHESED_MUSIC_LIST_FAIL,

GET_SINGELAGE_SONGE_START,
GET_SINGELAGE_SONGE_SUCCESS,
GET_SINGELAGE_SONGE_FAIL,
} from '../action/ActionType'

const initialState = ({
    getTopMusicStart:false,
    getTopMusicSuccess:null,
    getTopMusicFail:null,

    getLatestMusicStart:false,
    getLatestMusicSuccess:null,
    getLatestMusicFail:null,

    getAllMusicStart:false,
    getAllMusicSuccess:null,
    getAllMusicFail:null,

    addToCartSuccess:null,

    getAddToCartCoutStart:false,
    getAddToCartCoutSuccess:null,
    getAddToCartCoutFail:null,

    getAddToCartItemStart:false,
    getAddToCartItemSuccess:null,
    getAddToCartItemFail:null,
    
    purchMusicSuccess:false,

    getPuchsedItemStart:false,
    getPuchsedItemSuccess:null,
    getPuchsedItemFail:null,

    getSingleSongStart:false,
    getSingleSongSuccess:null,
    getSingleSongeFail:null,


})


const MusicReducer = (state = initialState, action) =>{
    switch(action.type){

        case GET_TOP_LIST_START: return {...state, getTopMusicStart:true}
        case GET_TOP_LIST_SUCCESS: return {...state, getTopMusicSuccess:action.data,  getTopMusicFail:null, getTopMusicStart:false}
        case GET_TOP_LIST_FAIL: return {...state, getTopMusicSuccess:null, getTopMusicFail:action.data,  getTopMusicStart:false}
        
        case GET_LATEST_MUSIC_START: return{...state, getLatestMusicStart:true}
        case GET_LATEST_MUSIC_SUCCESS: return{...state, getLatestMusicSuccess:action.data,  getLatestMusicFail:null, getLatestMusicStart:false}
        case GET_LATEST_MUSIC_FAIL: return{...state, getLatestMusicSuccess:null, getLatestMusicFail:action.data,  getLatestMusicStart:false}

        case GET_ALL_MUSIC_START: return{...state, getAllMusicStart:true}
        case GET_ALL_MUSIC_SUCCESS: return{...state, getAllMusicSuccess:action.data,  getAllMusicFail:null, getAllMusicStart:false}
        case GET_ALL_MUSIC_FAIL: return{...state, getAllMusicSuccess:null, getAllMusicFail:action.data,  getAllMusicStart:false}

        case ADD_MUSIC_TO_CART_SUCCESS: return{...state, addToCartSuccess:action.data}
        case UPDATE_MUSIC_TO_CART_SUCCESS_STATUS: return{...state, addToCartSuccess:null}

        case COUNT_CARTED_MUSIC_START: return{...state, getAddToCartCoutStart:true}
        case COUNT_CARTED_MUSIC_SUCCESS: return{...state, getAddToCartCoutSuccess:action.data,  getAddToCartCoutFail:null, getAddToCartCoutStart:false}
        case COUNT_CARTED_MUSIC_FAIL: return{...state, getAddToCartCoutSuccess:null, getAddToCartCoutFail:action.data,  getAddToCartCoutStart:false}
        
        case GET_CART_MUSIC_LIST_START: return{...state, getAddToCartItemStart:true}
        case GET_CART_MUSIC_LIST_SUCCESS: return{...state, getAddToCartItemSuccess:action.data,  getAddToCartItemFail:null, getAddToCartItemStart:false}
        case GET_CART_MUSIC_LIST_FAIL: return{...state, getAddToCartItemSuccess:null, getAddToCartItemFail:action.data,  getAddToCartItemStart:false}
        
        case GET_PERCHESEMUSIC_SUCCESS: return {...state, purchMusicSuccess:true}

        case GET_PERCHESED_MUSIC_LIST_START: return{...state, getPuchsedItemStart:true}
        case GET_PERCHESEDUSIC_LIST_SUCCESS: return{...state, getPuchsedItemSuccess:action.data,  getPuchsedItemFail:null, getPuchsedItemStart:false}
        case GET_PERCHESED_MUSIC_LIST_FAIL: return{...state, getPuchsedItemSuccess:null, getPuchsedItemStart:action.data,  getPuchsedItemStart:false}
        
        case GET_SINGELAGE_SONGE_START: return{...state, getSingleSongStart:true}
        case GET_SINGELAGE_SONGE_SUCCESS: return{...state, getSingleSongStart:false,  getSingleSongSuccess:action.data, getSingleSongeFail:null}
        case GET_SINGELAGE_SONGE_FAIL: return{...state, getSingleSongStart:false, getSingleSongSuccess:false,  getSingleSongeFail:action.data}
        

        default: return state

    }

}

export default MusicReducer;