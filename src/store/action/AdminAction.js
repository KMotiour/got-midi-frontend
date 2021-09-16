import { red } from '@material-ui/core/colors';
import axios from 'axios'
import {
    DELETE_LIST_OF_MUSIC_START,
    DELETE_LIST_OF_MUSIC_SUCCESS,
    DELETE_LIST_OF_MUSIC_FAIL,

    GET_SINGLE_SONG_START,
    GET_SINGLE_SONG_SUCCESS,
    GET_SINGLE_SONG_FAIL,

    UPDATE_SINGLE_SONG_START,
  UPDATE_SINGLE_SONG_SUCCESS,
  UPDATE_SINGLE_SONG_SUCCESS_STATUS,
  UPDATE_SINGLE_SONG_FAIL,

  SET_UPLOAD_FILE,

UPLOAD_FILE_START,
UPLOAD_FILE_SUCCESS,
UPLOAD_FILE_FAIL,

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

} from './ActionType'

import {getAllMusic, getTopMusic} from './MsuicAction'


export const deleteListOfMusic = (listOfId, config) => async (dispatch) => {
    try {
        dispatch({type:DELETE_LIST_OF_MUSIC_START})
        await axios.post("http://127.0.0.1:8000/music/deletelistofmusic/", listOfId, config).then((res) => {
          dispatch({
              type:DELETE_LIST_OF_MUSIC_SUCCESS,
              data:res.data
          })
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + res.data.access,
            },
          };

          dispatch()
        
        })

    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:DELETE_LIST_OF_MUSIC_FAIL,
        data:error
      })
    }
};


export const getSingleMusic = (id, config) => async (dispatch) => {
  try {
      dispatch({type:GET_SINGLE_SONG_START})

      await axios.get(`http://127.0.0.1:8000/music/rud/${id}/`, config).then((res) => {

        dispatch({
            type:GET_SINGLE_SONG_SUCCESS,
            data: res.data
        })
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + res.data.access,
          },
        };
        dispatch(getAllMusic(config))
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_SINGLE_SONG_FAIL,
      data:error
    })
  }

};

export const updateMusic = (id, formData, config) => async (dispatch) => {
  console.log(id, config, 'update music action');
  try {
      dispatch({type:UPDATE_SINGLE_SONG_START})

      await axios.patch(`http://127.0.0.1:8000/music/rud/${id}/`,formData,  config).then((res) => {
      console.log(res.data, 'actions');
        dispatch({
            type:UPDATE_SINGLE_SONG_SUCCESS,
            data: res.data
        })
        const config = {
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + res.data.access,
          },
        };
        
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:UPDATE_SINGLE_SONG_FAIL,
      data:error
    })
    // dispatch(getSingleMusic(id, config))
  }

};


export const uploadMusic = (formData, music, config) => async (dispatch) => {
  const id = Math.random()
  try {
      
      dispatch({type:UPLOAD_FILE_START, data:{
        music:music,
        id:id
      
      } })


      await axios.post(`http://127.0.0.1:8000/music/uplaod/`,formData, config).then((res) => {
        dispatch({
            type:UPLOAD_FILE_SUCCESS,
            data:{
              music:music,
              id:id
            }
           
            
        })
        dispatch(getAllMusic('', 1))
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + res.data.access,
          },
        };
        
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:UPLOAD_FILE_FAIL,
      data:{
        error:error,
        music:music,
        id:id
      }
    })
    // dispatch(getSingleMusic(id, config))
  }

};


export const getSoldMusicHistory = (config) => async (dispatch) => {

  try {
      
      dispatch({type:GET_SOLDMUSIC_HISTORY_START})
  

      await axios.get(`http://127.0.0.1:8000/music/soldmusichistory`, config).then((res) => {

        dispatch({
            type:GET_SOLDMUSIC_HISTORY_SUCCESS,
            data:res.data            
        })
        
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_SOLDMUSIC_HISTORY_FAIL,
      data:error
    })
   
  }

};


export const deleteSoldHistory = (listOfId, config) => async (dispatch) => {
  try {
      dispatch({type:DELETE_SOLD_HISTOYR_START})
      await axios.post("http://127.0.0.1:8000/music/deletesoldhistry/", listOfId, config).then((res) => {
        dispatch({
            type:DELETE_SOLD_HISTOYR_SUCCESS
        })
        dispatch(getSoldMusicHistory(config))
      })
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:DELETE_SOLD_HISTOYR_FAIL,
      data:error
    })
  }
};


export const getSongForTopList = (config, title) => async (dispatch) => {
  let value = "'"
  if (title){
    value=title
  }
  try {
      dispatch({type:GET_MUSIC_FOR_TOP_LIST_START})

      await axios.get(`http://127.0.0.1:8000/music/listfortoplist/${value}`, config).then((res) => {
        console.log(res.data);
        dispatch({
            type:GET_MUSIC_FOR_TOP_LIST_SUCCESS,
            data:res.data
        })
      })
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_MUSIC_FOR_TOP_LIST_FAIL,
      data:error
    })
  }
};


export const updateTopList = (id, config, p) => async (dispatch) => {
  try {
      dispatch({type:UPDATE_TOP_LIST_START})
      
      await axios.post("http://127.0.0.1:8000/music/newtoplist/",id, config).then((res) => {
        
        dispatch({
            type:UPDATE_TOP_LIST_SUCCESS,
            data:res.data
        })

        dispatch(getSongForTopList(config))
        dispatch(getTopMusic())
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:UPDATE_TOP_LIST_FAIL,
      data:error
    })
  }
};


export const getRequestedMusicList = (config) => async (dispatch) => {
  try {
      dispatch({type:GET_REQUESTED_MUSIC_LIST_START})
      
      await axios.get("http://127.0.0.1:8000/music/musicrequestlist",config).then((res) => {
        
        dispatch({
            type:GET_REQUESTED_MUSIC_LIST_SUCCESS,
            data:res.data
        })

      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_REQUESTED_MUSIC_LIST_FAIL,
      data:error
    })
  }
};

export const deleteRequestedMusicList = (id, config) => async (dispatch) => {
  try {
      dispatch({type:DELETE_REQUESTED_MUSIC_LIST_START})
      
      await axios.post("http://127.0.0.1:8000/music/deletemusicrequestlist/", id, config).then((res) => {
        
        dispatch({
            type:DELETE_REQUESTED_MUSIC_LIST_SUCCESS,
        })
        dispatch(getRequestedMusicList(config))
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:DELETE_REQUESTED_MUSIC_LIST_FAIL,
      data:error
    })
  }
};


export const getAdds = () => async (dispatch) => {
  try {
      dispatch({type:GET_ADDS_START})
      
      await axios.get("http://127.0.0.1:8000/music/listofadd", ).then((res) => {
        
        dispatch({
            type:GET_ADDS_SUCCESS,
            data:res.data
        })
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_ADDS_FAIL,
      data:error
    })
  }
};


export const searchMusic = (song, config) => async (dispatch) => {
  try {
      dispatch({type:SEARCH_MUSIC_START})
      
      await axios.post("http://127.0.0.1:8000/music/searchMusic/", song, config ).then((res) => {
        
        dispatch({
            type:SEARCH_MUSIC_SUCCESS,
            data:res.data
        })
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:SEARCH_MUSIC_FAIL,
      data:error
    })
  }
};


export const requestMusic = (formData, config) => async (dispatch) => {
  try {
      dispatch({type:REQUEST_MUSIC_START})
      
      await axios.post(`http://127.0.0.1:8000/music/createmusicrequest/`,formData, config ).then((res) => {
        console.log(res.data);
        dispatch({
            type:REQUEST_MUSIC_SUCCESS,
            data:res.data
        })
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:REQUEST_MUSIC_FAIL,
      data:error
    })
  }
};



export const getSellsReport = (config) => async (dispatch) => {
  try {
      dispatch({type:GET_SELL_RPORT_START})
      
      await axios.get(`http://127.0.0.1:8000/music/sellreport`, config ).then((res) => {
        console.log(res.data);
        dispatch({
            type:GET_SELL_RPORT_SUCCESS,
            data:res.data
        })
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_SELL_RPORT_FAIL,
      data:error
    })
  }
};



export const getSellsReportWithGiveDate = (fromDate, config) => async (dispatch) => {
  try {
      dispatch({type:GET_SELL_RPORT_WITH_GIVEN_DATE_START})
      
      await axios.post(`http://127.0.0.1:8000/music/sellreportwithgivendate/`, fromDate, config ).then((res) => {
        console.log(res.data);
        dispatch({
            type:GET_SELL_RPORT_WITH_GIVEN_DATE_SUCCESS,
            data:res.data
        })
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_SELL_RPORT_WITH_GIVEN_DATE_FAIL,
      data:error
    })
  }
};


export const getExtraInfo = () => async (dispatch) => {
  try {
      dispatch({type:GET_EXTRA_INFO_START})
      
      await axios.get(`http://127.0.0.1:8000/music/extrainfo/` ).then((res) => {
 
        dispatch({
            type:GET_EXTRA_INFO_SUCCESS,
            data:res.data
        })
      
      })

  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_EXTRA_INFO_FAIL,
      data:error
    })
  }
};


export const createExtraInfo = (formData, config) => async (dispatch) => {
  try {
      dispatch({type:CREATE_EXTRA_INFO_START})
      
      await axios.post(`http://127.0.0.1:8000/music/createextrainfo/`,formData, config ).then((res) => {
 
        dispatch({
            type:CREATE_EXTRA_INFO_SUCCESS,
        })
        
        dispatch(getExtraInfo())

      })


  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:CREATE_EXTRA_INFO_FAIL,
      data:error
    })
  }
};


