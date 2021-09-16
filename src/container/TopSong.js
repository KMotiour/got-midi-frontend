import React, {useState, useEffect} from 'react'
import Navber from '../component/navber/Navber'
import '../core.css'
import {useDispatch, useSelector} from 'react-redux'
import {getTopMusic} from '../store/action/MsuicAction'
import SongItem from '../component/SongItem'
import SnackBer from '../component/SnackBer'
import Footer from '../component/footer/Footer'

function TopSong() {


    const dispatch = useDispatch()
    const [youTubeId, setYoutubeId] = useState()
    const [showIframe, setShowIframe] = useState(false)
    const [storeId, setStoreId] = useState()
    const {getTopMusicStart, getTopMusicSuccess, getTopMusicFail,
        getLatestMusicStart, getTopMusicSuccessgetLatestMusicSuccess, getLatestMusicFail, addToCartSuccess } = useSelector(state => state.music)
    
    useEffect(() => {
        
        {!getTopMusicSuccess && dispatch(getTopMusic())}
           
    }, [])

    const handlePlayYouTubeVideo = (id) =>{
        console.log(id,'se id');
        setYoutubeId(id)
        setShowIframe(true)
    }
    
    const CloseShowIframe = () =>{
        setShowIframe(false)
    }

    return (
        <div>
            <div>
                <Navber />
            </div>

            <div class="main top_song_D" id="mainbody">
            <div className="asideM_div">
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
                <div class="row" id="top_Song_list">
             <div class="maincontainST">
                     <div class="TopPianoMIdiD" id="TopPianoMIdiD">
                    <h4 >Top Piano Midi Downloads</h4>

                    {getTopMusicSuccess && getTopMusicSuccess.map((music,index) =>(
                            < SongItem storeId={storeId} setStoreId={setStoreId} setShowIframe={setShowIframe} handlePlayYouTubeVideo={handlePlayYouTubeVideo} key={index} music={music.music} type="top"/>
                    ))}

                    </div>

                    </div>   
               
                    
                    {/* <div class="cardforadd">
                        <p class="add_BOX">HI I am your ad. </p>

                    </div> */}
                    </div>

                    <div className="aside_addP side__data" id="aside_addP">
        <h4>Piano Midi songs for SYNTHESIA </h4>
        <p>
        Buying expensive Midi files is now a thing of the past. Our midi service is affordable and a growing new database of Midi files in piano format.
            </p>
            <p>
            All of our midi songs can be used in Synthesia! All our midi songs can converted to sheet music using a free download app www.musescore.org
                    </p>
         </div>
       </div>     
       <br />
<br />
  
       <Footer />  
            </div>
            {addToCartSuccess && addToCartSuccess==='purched allready' &&  <SnackBer open={true} success_info="purched allready" />}
            {addToCartSuccess && addToCartSuccess==='already added to cart' &&  <SnackBer open={true} success_info="already added to cart" />}
        </div>
    )
}

export default TopSong
