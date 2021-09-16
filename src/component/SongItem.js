import React, {useState, useEffect} from 'react'
import ShowYoutubeVideo from './showYoutubeVideo/ShowYoutubeVideo'
import {AddMusicToCart} from '../store/action/MsuicAction'
import {useDispatch, useSelector} from 'react-redux'
import Login from '../container/Login'
import {NavLink} from 'react-router-dom'


function SongItem({storeId, setStoreId, setShowIframe, handlePlayYouTubeVideo, music, type}) {

    const dispatch = useDispatch()
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)
    const {get_user_info_start, get_user_info_success, update_user_info_success} = useSelector(state => state.user)

    
    const [playSong, setPlaySong] = useState(false)
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

    const handleAddToCart = (id) =>{
        if(!accessToken){
            setOpenLogin(true)
        }else{
        get_user_info_success && !get_user_info_success[0].is_superuser && dispatch(AddMusicToCart(id, config))
    }
    }
    
    const handleOpenVideo = (id, musicId) =>{
        handlePlayYouTubeVideo(id)
        setPlaySong(true)
        setStoreId(musicId)
        
    }

    const handleCloseVideo = () =>{
        setPlaySong(false)
        setShowIframe(false)
    }


    return (
        <div>
              
            {openLogin && <Login  open={true} setOpenLogin={setOpenLogin}/>}
             <div class="single_songDetels">
                            <ul class="flex-container overlayS" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                                <li class="flex-item flex1">
                                    <div class="videoimg">
                                        <img src={music.artWork}  alt="" width="8rem" id="img" />
                                        <div class="overlay" >
                                           {!playSong && 
                                            <a onClick={e=> handleOpenVideo(music.youtubeId, music.id)} class="icon" title="Play">
                                                <i  class="fas fa-play"></i>
                                            </a>
                                            }
                                            {storeId!==music.id && 
                                             <a onClick={e=> handleOpenVideo(music.youtubeId, music.id)} class="icon" title="Play">
                                                <i  class="fas fa-play"></i>
                                            </a>
                                            }
                                            {playSong && storeId==music.id &&
                                       
                                            <a onClick={e => handleCloseVideo()} class="icon" title="Stop">
                                                <i  style={{fontSize:40}} class="fas fa-window-close"></i>
                                            </a>
                                            }
                                        </div>
                                    </div>
                                </li>
                                
                                <li class="flex-item flex2">
                                <NavLink to={"/song/"+music.title+"-"+music.artist+"/"+music.id}>
                                <h6>{music.artist}</h6>
                                    <p>{music.title}</p>
                                    <div id="song_data">
                                        <span class="labels">{music.key}<br /><span class="small_subtitle">Key</span></span>
                                        <span class="labels">{music.bpm}<br /><span class="small_subtitle">BPM</span></span>
                                    </div>
                                    </NavLink>
                                </li>
                               
                                <li class="flex-item flex3">
                                    {type==="download" ? 
                                   <a href={music.song}> <button onClick={e=> {handleAddToCart(music.id)}} class="btn" id="addtoCard" title="Add to cart">Download</button></a>
                                    : 
                                        <button onClick={e=> {handleAddToCart(music.id)}} class="btn" id="addtoCard" title="Add to cart"> ${music.price} </button>
                                    }
                                   
                                    {/* <button style={{ marginTop:-15}} class="btn" id="addtoCard" title="Add to Cart"> AddToCart </button> */}
                                </li>
                            </ul>


                        </div>
        </div>
    )
}

export default SongItem
