import axios from 'axios'
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

COUNT_CARTED_MUSIC_START,
COUNT_CARTED_MUSIC_SUCCESS,
COUNT_CARTED_MUSIC_FAIL,

GET_CART_MUSIC_LIST_START,
GET_CART_MUSIC_LIST_SUCCESS,
GET_CART_MUSIC_LIST_FAIL,

GET_PERCHESED_MUSIC_START,
GET_PERCHESEMUSIC_SUCCESS,
GET_PERCHESED_MUSIC_FAIL,

GET_PERCHESED_MUSIC_LIST_START,
GET_PERCHESEDUSIC_LIST_SUCCESS,
GET_PERCHESED_MUSIC_LIST_FAIL,

GET_SINGELAGE_SONGE_START,
GET_SINGELAGE_SONGE_SUCCESS,
GET_SINGELAGE_SONGE_FAIL,

} from './ActionType'


const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('access_token'),
    },
  };


export const getTopMusic = () => async (dispatch) => {
    console.log(config, 'config');
    try {
        dispatch({type:GET_TOP_LIST_START})

            await axios.get("http://127.0.0.1:8000/music/toplist/").then((res) => {
                dispatch({
                    type:GET_TOP_LIST_SUCCESS,
                    data : res.data
                })
      
              })
        
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:GET_TOP_LIST_FAIL,
        data:error
      })
    }

};


export const getLatestMusic = () => async (dispatch) => {
    try {
        dispatch({type:GET_LATEST_MUSIC_START})
  
        await axios.get("http://127.0.0.1:8000/music/latestmusic/").then((res) => {
            dispatch({
                type:GET_LATEST_MUSIC_SUCCESS,
                data : res.data
            })
  
          })
    
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:GET_LATEST_MUSIC_FAIL,
        data:error
      })
    }

};


export const getAllMusic = (title, p) => async (dispatch) => {
  console.log(title, 'titleesss', p);
    let value = "'"
    if (title){
      value=title
    }
    try {
        dispatch({type:GET_ALL_MUSIC_START})

            await axios.get(`http://127.0.0.1:8000/music/listwithfilter/${value}?p=${p}`).then((res) => {
             
            dispatch({
                    type:GET_ALL_MUSIC_SUCCESS,
                    data : res.data
                })
      
              })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:GET_ALL_MUSIC_FAIL,
        data:error
      })
    }

};

export const AddMusicToCart = (id, config) => async (dispatch) => {
    try {
        dispatch({type:ADD_MUSIC_TO_CART_START})
        await axios.get(`http://127.0.0.1:8000/music/addremovetocart/${id}`, config).then((res) => {
        console.log(res.data);
        dispatch({
          type:ADD_MUSIC_TO_CART_SUCCESS,
          data:res.data
        })
        dispatch(CountCartedMusic(config))

        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:ADD_MUSIC_TO_CART_FAIL,
        data:error
      })
    }

};

export const RemoveMusicFromCart = (id, config) => async (dispatch) => {
  try {
      await axios.get(`http://127.0.0.1:8000/music/removeitemfromcart/${id}`, config).then((res) => {

        dispatch(CartItems(config))
        dispatch(CountCartedMusic(config))

      })
      
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"

  }

};

export const CountCartedMusic = (config) => async (dispatch) => {
    try {
        dispatch({type:COUNT_CARTED_MUSIC_START})
      await axios.get(`http://127.0.0.1:8000/music/addtocartitemscount`, config).then((res) => {
          
          dispatch({
              type:COUNT_CARTED_MUSIC_SUCCESS,
              data : res.data
          })

        })
        
    } catch (err) {
      const error =  err.response ? err.response  : "networkError"
      dispatch({
        type:COUNT_CARTED_MUSIC_FAIL,
        data:error
      })
    }

};


export const CartItems = (config) => async (dispatch) => {
  try {
      dispatch({type:GET_CART_MUSIC_LIST_START})
      await axios.get(`http://127.0.0.1:8000/music/addtocartitems/`, config).then((res) => {
      console.log(res.data);
      dispatch({
        type:GET_CART_MUSIC_LIST_SUCCESS,
        data:res.data
      })

      })
      
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_CART_MUSIC_LIST_FAIL,
      data:error
    })
  }

};

export const purchedMusicList = (config) => async (dispatch) => {
  try {
      dispatch({type:GET_PERCHESED_MUSIC_LIST_START})
      await axios.get(`http://127.0.0.1:8000/music/ownedmusics`, config).then((res) => {
      console.log(res.data);
      dispatch({
        type:GET_PERCHESEDUSIC_LIST_SUCCESS,
        data:res.data
      })

      })
      
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_PERCHESED_MUSIC_LIST_FAIL,
      data:error
    })
  }

};

export const purchMusic = (config) => async (dispatch) => {
  try {

      dispatch({type:GET_PERCHESED_MUSIC_START})

      await axios.get(`http://127.0.0.1:8000/music/purchasemusic`, config).then((res) => {

      dispatch({
        type:GET_PERCHESEMUSIC_SUCCESS,
      })

      dispatch(CartItems())
      dispatch(CountCartedMusic())

      })
      
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_PERCHESED_MUSIC_FAIL,
      data:error
    })
  }

};

export const getSingeleSong = (id) => async (dispatch) => {
  try {

      dispatch({type:GET_SINGELAGE_SONGE_START})

      await axios.get(`http://127.0.0.1:8000/music/singleSong/${id}`).then((res) => {

      dispatch({
        type:GET_SINGELAGE_SONGE_SUCCESS,
        data: res.data
      })



      })
      
  } catch (err) {
    const error =  err.response ? err.response  : "networkError"
    dispatch({
      type:GET_SINGELAGE_SONGE_FAIL,
      data:error
    })
  }

};