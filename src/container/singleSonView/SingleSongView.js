import React, {useEffect, useState} from 'react'
import './SingleSongView.css'
import Navber from '../../component/navber/Navber'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {getSingeleSong, AddMusicToCart} from '../../store/action/MsuicAction'
import SnackBer from '../../component/SnackBer'
import Footer from '../../component/footer/Footer'


function SingleSongView() {

    const dispatch = useDispatch()
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)
    const { getSingleSongStart, getSingleSongSuccess, getSingleSongeFail, addToCartSuccess } = useSelector(state => state.music)
    const {get_user_info_start, get_user_info_success, update_user_info_success} = useSelector(state => state.user)
    const {id} = useParams()
    const [youTubeId, setYoutubeId] = useState()
    const [showIframe, setShowIframe] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    useEffect(() => {
        dispatch(getSingeleSong(id))
       
    }, [])

  const handlePlayYouTubeVideo = (id) =>{
      setYoutubeId(id)
      setShowIframe(true)
  }
  
  const CloseShowIframe = () =>{
      setShowIframe(false)
  }

  const handleAddToCart = (id) =>{
    if(!accessToken){
        setOpenLogin(true)
    }else{
    get_user_info_success && !get_user_info_success[0].is_superuser && dispatch(AddMusicToCart(id, config))
}
}

    return (
        <div>
            <div>
                <Navber />
            </div>
            <div>
                    <div class="main">

                    {showIframe && 
                        <div className="songAlbum">
                        <div className="songAlbum_Colse">
                        <button  onClick={CloseShowIframe} type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                           
                            <div>
                            <iframe width="200" height="80" src={`https://www.youtube.com/embed/${youTubeId}?&autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                            </div>
                            
                        </div>
                    }
<div id="singleSongViews"  style={{boxShadow: "none"}}>

<div id="songItemDescription">

<div class="" >
        <img src={getSingleSongSuccess && getSingleSongSuccess.singleSong.artWork} alt="" id="SingleDescriptionimg" />
        
</div>

<div className="SingleSongData">
<h6> {getSingleSongSuccess && getSingleSongSuccess.singleSong.artist}</h6>
        <p>{getSingleSongSuccess && getSingleSongSuccess.singleSong.title}</p>
        <button onClick={e =>(handleAddToCart(getSingleSongSuccess.singleSong.id))} class="btn" id="songCardDetails" title="Add to Cart">${getSingleSongSuccess && getSingleSongSuccess.singleSong.price} </button>


</div>

</div>

<div className="singlesongeD_F">
      <iframe  src={`https://www.youtube.com/embed/${getSingleSongSuccess && getSingleSongSuccess.singleSong.youtubeId}?&frameborder=0`} frameborder="0" allowfullscreen></iframe>

      </div>

  </div>
        <div className="SingleSongflex">
        <div class="PageMaindiv">
          
              <div class="midiDescrition">
                <div className="singleSongDes_D">
             <a href="#">MIDI Description</a>
                        {/* <div id="desc-str-newline">{getSingleSongSuccess && getSingleSongSuccess.singleSong.description}</div> */}
                        <div id="desc-str-newline">{getSingleSongSuccess && getSingleSongSuccess.singleSong.artist}- {getSingleSongSuccess && getSingleSongSuccess.singleSong.title}</div>
                        <div>Key: {getSingleSongSuccess && getSingleSongSuccess.singleSong.key}</div>
                        <div>BPM: {getSingleSongSuccess && getSingleSongSuccess.singleSong.bpm}</div>
                        <div>Format: Piano midi file.</div>
             </div>
                        
                    </div>
            <div class="listofSong">
              <h5 style={{color: '#2d3138d9'}}>Similar song</h5>
                {getSingleSongSuccess && getSingleSongSuccess.similarSong.length<1 && <p>No simlar song availabe</p>}
            {getSingleSongSuccess && getSingleSongSuccess.similarSong && getSingleSongSuccess.similarSong.map(song =>(
                <div class="single_songDetels" id="listofsongitme"  style={{boxShadow: "none"}}>
               
                    
                    <ul class="flex-container" style={{marginTop: "2rem", marginBottom: "2rem"}}>
                        <li class="flex-item flex1">
                          <div class="videoimg" onClick={e => {handlePlayYouTubeVideo(song.youtubeId)}}>
                          <img src={song.artWork} alt="" width="8rem" />
                          <div class="overlay">
                            <a href="#" class="icon" title="Play">
                              <i class="fas fa-play"></i>
                            </a>
                          </div>
            
                          </div>
                        
                        </li>
                        <a href={"/singlesong/"+song.id}>
                        <li class="flex-item flex2">
                        <h6>{song.artist}</h6>
                          <p>{song.title}</p>
                         
                        <div id="song_data">
                          <span class="labels">{song.key}<br/><span class="small_subtitle">Key</span></span>
                          <span class="labels">{song.bpm}<br/><span class="small_subtitle">BPM</span></span>
                       
                        </div>
                      </li>
                      </a>
                      
                        <li class="flex-item flex3">
                          <button onClick={e =>(handleAddToCart(song.id))}  class="btn" id="addtoCard" title="Add to Cart"> ${song.price}</button>
            
                      </li>
            
                      </ul>
                     
                  </div>
                  
                   ))}
            </div>
                    </div>

                    
                  
                    {/* <div className="aside_add">
        <h4>Piano Midi songs for SYNTHESIA </h4>
        <p>
        Buying expensive Midi files is now a thing of the past. Our midi service is affordable and a growing new database of Midi files in piano format.
            </p>
            <p>
            All of our midi songs can be used in Synthesia! All our midi songs can converted to sheet music using a free download app www.musescore.org
                    </p>
         </div> */}
       
         </div>


        </div>
            </div>
            {addToCartSuccess && addToCartSuccess==='purched allready' &&  <SnackBer open={true} success_info="purched allready" />}
            {addToCartSuccess && addToCartSuccess==='already added to cart' &&  <SnackBer open={true} success_info="already added to cart" />}

            <br />
<br />
<br/>
            <Footer />
        </div>
    )
}

export default SingleSongView








