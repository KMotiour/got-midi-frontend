import React, {useState, useEffect} from 'react'
import ShowYoutubeVideo from '../component/showYoutubeVideo/ShowYoutubeVideo'
import {useDispatch, useSelector} from 'react-redux'

function MusicItem({music, type}) {

    const dispatch = useDispatch()
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)
    
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };


    return (
        <div>

            {showYoutubeVideo && <ShowYoutubeVideo open={true} youtubeID={music.youtubeId} setShowYoutubeVideo={setShowYoutubeVideo}/>}
             <div class="single_songDetels" style={{marginTop:20}} id>
                            <div style={{width:'100%'}}>
                                <div style={{display:'flex', }}>
                                    <input type="checkBox" /> &nbsp;<p>Select all</p>

                                </div>

                            </div>
                            <ul class="flex-container" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                                
                                <li>
                                    <input type="checkbox" />
                                </li>
                                
                                <li class="flex-item flex1">
                                    <div class="videoimg">
                                        <img src={music.artWork}  alt="" width="8rem" />
                                        <div class="overlay" onClick={e => setShowYoutubeVideo(true)}>
                                            <a  class="icon" title="Play">
                                                <i class="fas fa-play"></i>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="flex-item flex2"><p>{music.title}</p>
                                    <h6>{music.artist}</h6>
                                    <div id="song_data">
                                        <span class="labels">{music.key}<br /><span class="small_subtitle">Key</span></span>
                                        <span class="labels">{music.bpm}<br /><span class="small_subtitle">BPM</span></span>
                                    </div>
                                </li>
                                <li class="flex-item flex3">
                                    
                                        <button class="btn" id="addtoCard" title="Add to cart"> ${music.price} </button>
                                        
                                    
                                   
                                    {/* <button style={{ marginTop:-15}} class="btn" id="addtoCard" title="Add to Cart"> AddToCart </button> */}
                                </li>
                            </ul>


                        </div>
            
        </div>
    )
}

export default MusicItem
