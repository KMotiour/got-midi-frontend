import React, {useState, useEffect} from 'react'
import ShowYoutubeVideo from './showYoutubeVideo/ShowYoutubeVideo'
import {AddMusicToCart} from '../store/action/MsuicAction'
import {useDispatch, useSelector} from 'react-redux'
import {requestMusic} from '../store/action/AdminAction'
import Login from '../container/Login'
import axios from 'axios'


function SongItemForSearch({music, type}) {

    const dispatch = useDispatch()
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)
    const [render, setRender]=useState()
    const {get_user_info_start, get_user_info_success, update_user_info_success,
    } = useSelector(state => state.user)

    const {requestMusicStart, requestMusicSuccess, requestMusicFail,} = useSelector(state => state.admin)

    
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
    
      const config2 = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const checkIsRequested = (spotifyId) =>{
        // const [state, setState] = useState()
        // let data = axios.get(`http://127.0.0.1:8000/music/test/${spotifyId}`, config)
        // data.then((res, x)=>{
        // })  
        return 'state'
      }


      const handleAddToCart = (id) =>{
        if(!accessToken){
            setOpenLogin(true)
        }else{
        get_user_info_success && !get_user_info_success[0].is_superuser && dispatch(AddMusicToCart(id, type, config))
    }
    }

      const hanldeRequest = (music) =>
      {
          console.log(music);
        const formData = new FormData()
        formData.append('title', music.name)
        formData.append('spotifyId', music.spotifyId)
        formData.append('spotifyLink', music.spotifyLink)
        dispatch(requestMusic(formData, config2))
        
     }


    return (
        <div>
            {openLogin && <Login  open={true} setOpenLogin={setOpenLogin}/>}
            <div>
                <div className="asideM_div">
                <div className="maincontainS">
            
             <div class="single_songDetels">

                            <ul class="flex-container" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                                <li class="flex-item flex1">
                                    <div class="videoimg">
                                        <img src={music.artwork}  alt="" width="8rem" id="img" />
                                        <div class="overlay">
                                            <a  class="icon" title="Play">
                                                <i class="fas fa-play"></i>
                                            </a>
                                        </div>
                                    </div>
                                </li>

                                <li style={{ cursor: 'pointer' }} class="flex-item flex2"><p>{music.name}</p>
                                    
                                        <h6>{music.artist}</h6>
                                        {music.is_abailable && 
                                        <div id="song_data">
                                            <span class="labels">{music.key}<br /><span class="small_subtitle">Key</span></span>
                                            <span class="labels">{music.bpm}<br /><span class="small_subtitle">BPM</span></span>
                                        </div>
                                       }
                                </li>
                                    
                                
                                <li class="flex-item flex3">

                                {music.is_abailable ? <div>
                                    <button  style={{ marginLeft:0}} class="btn" id="addtoCard" title="Add to Cart"> ${music.price} </button>
                                    <button onClick={e => {handleAddToCart(music.id)}} style={{ marginLeft:5}} class="btn" id="addtoCard" title="Add to Cart"> AddToCart </button>
                                    </div>
                                    :
                                    <div>
                                    {requestMusicSuccess && requestMusicSuccess.spotifyId===music.spotifyId ? 
                                    <button onClick={e=>{hanldeRequest(music)}} style={{ marginTop:0}} class="btn" id="addtoCard" title="Add to Cart"> requested </button>
                                    :
                                    <button onClick={e=>{hanldeRequest(music)}} style={{ marginTop:0}} class="btn" id="addtoCard" title="Add to Cart"> your ad. </button>
                                        }
                                    </div>
                                }

                                    </li>
                            </ul>


                        </div>
                        </div>
                        </div>
                        </div>

        </div>
    )
}

export default SongItemForSearch
