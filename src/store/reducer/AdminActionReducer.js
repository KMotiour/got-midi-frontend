import {
    DELETE_LIST_OF_MUSIC_START,
    DELETE_LIST_OF_MUSIC_SUCCESS,
    DELETE_LIST_OF_MUSIC_FAIL,
    UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS,

    GET_SINGLE_SONG_START,
    GET_SINGLE_SONG_SUCCESS,
    GET_SINGLE_SONG_FAIL,

    UPDATE_SINGLE_SONG_START,
    UPDATE_SINGLE_SONG_SUCCESS,
    UPDATE_SINGLE_SONG_SUCCESS_STATUS,
    UPDATE_SINGLE_SONG_FAIL,

    UPLOAD_FILE_START,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAIL,
    CLEAN_UPLOAD_FILE_STATUS,

    GET_SOLDMUSIC_HISTORY_START,
    GET_SOLDMUSIC_HISTORY_SUCCESS,
    GET_SOLDMUSIC_HISTORY_FAIL,

    DELETE_SOLD_HISTOYR_START,
    DELETE_SOLD_HISTOYR_SUCCESS,
    UPDATE_DELETE_SOLD_HISTOYR_SUCCESS,
    DELETE_SOLD_HISTOYR_FAIL,

    GET_MUSIC_FOR_TOP_LIST_START,
    GET_MUSIC_FOR_TOP_LIST_SUCCESS,
    GET_MUSIC_FOR_TOP_LIST_FAIL,

    UPDATE_TOP_LIST_START,
    UPDATE_TOP_LIST_SUCCESS,
    UPDATE_TOP_LIST_FAIL,
    UPDATE_TOP_LIST_SUCCESS_STATUS,


    GET_REQUESTED_MUSIC_LIST_START,
    GET_REQUESTED_MUSIC_LIST_SUCCESS,
    GET_REQUESTED_MUSIC_LIST_FAIL,

    DELETE_REQUESTED_MUSIC_LIST_START,
    DELETE_REQUESTED_MUSIC_LIST_SUCCESS,
    DELETE_REQUESTED_MUSIC_LIST_FAIL,
    UPDATE_DELETE_REQUESTED_MUSIC_LIST_SUCCESS,

    GET_ADDS_START,
    GET_ADDS_SUCCESS,
    GET_ADDS_FAIL,

    UPDATE_ADD_START,
    UPDATE_ADD_SUCCESS,
    UPDATE_ADD_FAIL,

    SEARCH_MUSIC_START,
    SEARCH_MUSIC_SUCCESS,
    SEARCH_MUSIC_FAIL,
    
    REQUEST_MUSIC_START,
    REQUEST_MUSIC_SUCCESS,
    REQUEST_MUSIC_FAIL,

    GET_SELL_RPORT_START,
    GET_SELL_RPORT_SUCCESS,
    GET_SELL_RPORT_FAIL,

    GET_SELL_RPORT_WITH_GIVEN_DATE_START,
    GET_SELL_RPORT_WITH_GIVEN_DATE_SUCCESS,
    GET_SELL_RPORT_WITH_GIVEN_DATE_FAIL,

    GET_EXTRA_INFO_START,
    GET_EXTRA_INFO_SUCCESS,
    GET_EXTRA_INFO_FAIL,

    CREATE_EXTRA_INFO_START,
    CREATE_EXTRA_INFO_SUCCESS,
    CREATE_EXTRA_INFO_FAIL,
    UPDATE_CREATE_EXTRA_INFO_SUCCESS_STATIS,


} from '../action/ActionType'
import { modifyFiles } from './uploadFile.utils'

const initialState = ({
    deleteListOfMusicStart:false,
    deleteListOfMusicSuccess:null,
    deleteListOfMusicFail:null,

    getSingleSongStart :false,
    getSingleSongSuccess:null,
    getSingleSongFail:null,

    updateSingleMusicStart:false,
    updateSingleMusicSuccess:false,
    updateSingleMusicFail:null,


    fileProgress:{

    },

    getSoldMusicHistoryStart :false,
    getSoldMusicHistorySuccess:null,
    getSoldMusicHistoryFail:null,

    deleteSoldMusicHistoryStart :false,
    deleteSoldMusicHistorySuccess:false,
    deleteSoldMusicHistoryFail:null,

    getSongForTopListStart:false,
    getSongForTopListSuccess:null,
    getSongForTopListFail:false,

    updateTopListStart:false,
    updateTopListSuccess:null,
    updateTopListFail:false,

    getRequestedMusicStart:false,
    getRequestedMusicSuccess:null,
    getRequestedMusicFail:null,

    deleteRequestedMusicStart:false,
    deleteRequestedMusicSuccess:false,
    deleteRequestedMusicFail:null,

   getAddStart:false,
   getAddSuccess:null,
   getAddFail:null,

   UpdateAddStart:false,
   UpdateAddSuccess:null,
   UpdateAddFail:null,
    
    
    searchMusicStart:false,
    searchMusicSuccess:null,
    searchMusicFail:null,

    requestMusicStart:false,
    requestMusicSuccess:null,
    requestMusicFail:null,

    getSellReportStart:false,
    getSellReportSuccess:null,
    getSellReportFail:null,

    getSellReportWithDateStart:false,
    getSellReportWithDateSuccess:null,
    getSellReportWithDateFail:null,

 
    getExtraInfoStart:false,
    getExtraInfosuccess:null,
    getExtraInfoFail:null,

    createExtraInfoStart:false,
    createExtraInfosuccess:false,
    createExtraInfoFail:false

})


    
const AdminActionReducer = (state = initialState, action) =>{
    switch(action.type){

        case DELETE_LIST_OF_MUSIC_START: return{...state, deleteListOfMusicStart:true}
        case DELETE_LIST_OF_MUSIC_SUCCESS: return{...state, deleteListOfMusicStart:false, deleteListOfMusicSuccess:action.data, deleteListOfMusicFail:null}
        case DELETE_LIST_OF_MUSIC_FAIL: return{...state, deleteListOfMusicStart:false, deleteListOfMusicSuccess:null, deleteListOfMusicFail:action.data}
        case UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS: return{...state, deleteListOfMusicStart:false, deleteListOfMusicSuccess:null, deleteListOfMusicFail:null}
        
        case GET_SINGLE_SONG_START: return{...state, getSingleSongStart:true}
        case GET_SINGLE_SONG_SUCCESS: return{...state, getSingleSongStart:false, getSingleSongSuccess:action.data, getSingleSongFail:null}
        case GET_SINGLE_SONG_FAIL: return{...state, getSingleSongStart:false, getSingleSongSuccess:null, getSingleSongFail:action.data}
        // case UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS: return{...state, deleteListOfMusicStart:false, deleteListOfMusicSuccess:false, deleteListOfMusicFail:null}
        

        case UPDATE_SINGLE_SONG_START: return{...state, updateSingleMusicStart:true}
        case UPDATE_SINGLE_SONG_SUCCESS: return{...state, updateSingleMusicStart:false, updateSingleMusicSuccess:true, updateSingleMusicFail:null}
        case UPDATE_SINGLE_SONG_FAIL: return{...state, updateSingleMusicStart:false, updateSingleMusicSuccess:false, updateSingleMusicFail:action.data}
        case UPDATE_SINGLE_SONG_SUCCESS_STATUS: return{...state, updateSingleMusicStart:false, updateSingleMusicSuccess:false, updateSingleMusicFail:null}
        
        case GET_SOLDMUSIC_HISTORY_START: return{...state, getSoldMusicHistoryStart:true}
        case GET_SOLDMUSIC_HISTORY_SUCCESS: return{...state, getSoldMusicHistoryStart:false, getSoldMusicHistorySuccess:action.data, getSoldMusicHistoryFail:null}
        case GET_SOLDMUSIC_HISTORY_FAIL: return{...state, getSoldMusicHistoryStart:false, getSoldMusicHistorySuccess:null, getSoldMusicHistoryFail:action.data}
        
        case DELETE_SOLD_HISTOYR_START: return{...state, deleteSoldMusicHistoryStart:true}
        case DELETE_SOLD_HISTOYR_SUCCESS: return{...state, deleteSoldMusicHistoryStart:false, deleteSoldMusicHistorySuccess:true, deleteSoldMusicHistoryFail:null}
        case DELETE_SOLD_HISTOYR_FAIL: return{...state, deleteSoldMusicHistoryStart:false, deleteSoldMusicHistorySuccess:false, deleteSoldMusicHistoryFail:action.data}
        

        case GET_MUSIC_FOR_TOP_LIST_START: return{...state, getSongForTopListStart:true}
        case GET_MUSIC_FOR_TOP_LIST_SUCCESS: return{...state, getSongForTopListStart:false, getSongForTopListSuccess:action.data, getSongForTopListFail:null}
        case GET_MUSIC_FOR_TOP_LIST_FAIL: return{...state, getSongForTopListStart:false, getSongForTopListSuccess:null, getSongForTopListFail:action.data}
        
        case UPDATE_TOP_LIST_START: return{...state, updateTopListStart:true}
        case UPDATE_TOP_LIST_SUCCESS: return{...state, updateTopListStart:false, updateTopListSuccess:action.data, updateTopListFail:null}
        case UPDATE_TOP_LIST_FAIL: return{...state, updateTopListStart:false, updateTopListSuccess:null, updateTopListFail:action.data}
        case UPDATE_TOP_LIST_SUCCESS_STATUS: return{...state, updateTopListStart:false, updateTopListSuccess:null, updateTopListFail:null}
        
        case GET_REQUESTED_MUSIC_LIST_START: return{...state, getRequestedMusicStart:true}
        case GET_REQUESTED_MUSIC_LIST_SUCCESS: return{...state, getRequestedMusicStart:false, getRequestedMusicSuccess:action.data, getRequestedMusicFail:null}
        case GET_REQUESTED_MUSIC_LIST_FAIL: return{...state, getRequestedMusicStart:false, getRequestedMusicSuccess:null, getRequestedMusicFail:action.data}
        
        case DELETE_REQUESTED_MUSIC_LIST_START: return{...state, deleteRequestedMusicStart:true}
        case DELETE_REQUESTED_MUSIC_LIST_SUCCESS: return{...state, deleteRequestedMusicStart:false, deleteRequestedMusicSuccess:true, deleteRequestedMusicFail:null}
        case DELETE_REQUESTED_MUSIC_LIST_FAIL: return{...state, deleteRequestedMusicStart:false, deleteRequestedMusicSuccess:false, deleteRequestedMusicFail:action.data}
        case UPDATE_DELETE_REQUESTED_MUSIC_LIST_SUCCESS: return{...state, deleteRequestedMusicStart:false, deleteRequestedMusicSuccess:false, deleteRequestedMusicFail:null}
       
        case UPDATE_ADD_START: return{...state, getAddStart:true}
        case UPDATE_ADD_SUCCESS: return{...state, getAddStart:false, getAddSuccess:action.data, getAddFail:null}
        case UPDATE_ADD_FAIL: return{...state, getAddStart:false, getAddSuccess:null, getAddFail:action.data}
        
        case SEARCH_MUSIC_START: return{...state, searchMusicStart:true}
        case SEARCH_MUSIC_SUCCESS: return{...state, searchMusicStart:false, searchMusicSuccess:action.data, searchMusicFail:null}
        case SEARCH_MUSIC_FAIL: return{...state, searchMusicStart:false, searchMusicSuccess:null, searchMusicFail:action.data}
        
        case REQUEST_MUSIC_START: return{...state, requestMusicStart:true}
        case REQUEST_MUSIC_SUCCESS: return{...state, requestMusicStart:false, requestMusicSuccess:action.data, requestMusicFail:null}
        case REQUEST_MUSIC_FAIL: return{...state, requestMusicStart:false, requestMusicSuccess:null, requestMusicFail:action.data}
 
        case GET_SELL_RPORT_START: return{...state, getSellReportStart:true}
        case GET_SELL_RPORT_SUCCESS: return{...state, getSellReportStart:false, getSellReportSuccess:action.data, getSellReportFail:null}
        case GET_SELL_RPORT_FAIL: return{...state, getSellReportStart:false, getSellReportSuccess:null, getSellReportFail:action.data}
         
        case GET_SELL_RPORT_WITH_GIVEN_DATE_START: return{...state, getSellReportWithDateStart:true}
        case GET_SELL_RPORT_WITH_GIVEN_DATE_SUCCESS: return{...state, getSellReportWithDateStart:false, getSellReportWithDateSuccess:action.data, getSellReportWithDateFail:null}
        case GET_SELL_RPORT_WITH_GIVEN_DATE_FAIL: return{...state, getSellReportWithDateStart:false, getSellReportWithDateSuccess:null, getSellReportWithDateFail:action.data}
        
        case GET_EXTRA_INFO_START: return{...state, getExtraInfoStart:true}
        case GET_EXTRA_INFO_SUCCESS: return{...state, getExtraInfoStart:false, getExtraInfosuccess:action.data, getExtraInfoFail:null}
        case GET_EXTRA_INFO_FAIL: return{...state, getExtraInfoStart:false, getExtraInfosuccess:null, getExtraInfoFail:action.data}
        
        case CREATE_EXTRA_INFO_START: return{...state, createExtraInfoStart:true}
        case CREATE_EXTRA_INFO_SUCCESS: return{...state, createExtraInfoStart:false, createExtraInfosuccess:true, createExtraInfoFail:null}
        case CREATE_EXTRA_INFO_FAIL: return{...state, createExtraInfoStart:false, createExtraInfosuccess:false, createExtraInfoFail:action.data}
        case UPDATE_CREATE_EXTRA_INFO_SUCCESS_STATIS: return{...state, createExtraInfoStart:false, createExtraInfosuccess:null, createExtraInfoFail:false}

        case UPLOAD_FILE_START:
            return{
                ...state,
                fileProgress:{
                    ...state.fileProgress,
                    [action.data.id]:{
                        'name':action.data.music.name,
                        'start':true,
                        'success':false,
                        'error':null

                    }
                }
            }
            case UPLOAD_FILE_SUCCESS:
                return{
                    ...state,
                    fileProgress:{
                        ...state.fileProgress,
                        [action.data.id]:{
                            'name':action.data.music.name,
                            'start':false,
                            'success':true,
                            'error':null
    
                        }
                    }
                }

                case UPLOAD_FILE_SUCCESS:
                    return{
                        ...state,
                        fileProgress:{
                            ...state.fileProgress,
                            [action.data.id]:{
                                ...state.fileProgress.action.data.id,
                                'start':false,
                                'success':true,

                                
        
                            }
                        }
                    }
                   
                    case UPLOAD_FILE_FAIL:
                        return{
                            ...state,
                            fileProgress:{
                                ...state.fileProgress,
                                [action.data.id]:{
                                    'name':action.data.music.name,
                                    'start':false,
                                    'success':false,
                                    'error':true
            
                                }
                            }
                        }
                    case CLEAN_UPLOAD_FILE_STATUS:
                        return{
                            ...state,
                            fileProgress:{

                            }
                        }
    //     case SET_UPLOAD_FILE:
    //         return {
    //           ...state,
    //           fileProgress: {
    //           ...state.fileProgress,
    //           [action.data]:{
    //               'start':true,
    //               error:'no error'
    //           }
    //         },
    // }


        default: return state

    }

}

export default AdminActionReducer;