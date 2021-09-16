import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navber from '../component/navber/Navber'
import SongItem from '../component/SongItem'
import {NavLink } from "react-router-dom";
import ShowYoutubeVideo from '../component/showYoutubeVideo/ShowYoutubeVideo'
import {useDispatch, useSelector} from 'react-redux'
import {getTopMusic, getLatestMusic} from '../store/action/MsuicAction'
import SnackBer from '../component/SnackBer'
import '../core.css'
import Footer from '../component/footer/Footer'


function HomePage() {

    const dispatch = useDispatch()
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
    const {getTopMusicStart, getTopMusicSuccess, getTopMusicFail,
        getLatestMusicStart, getLatestMusicSuccess, getLatestMusicFail, addToCartSuccess } = useSelector(state => state.music)
    const {accessToken, is_superUser} = useSelector(state => state.auth)
    console.log(accessToken, is_superUser);
    const [adds, setAdds]=useState()
    const [youTubeId, setYoutubeId] = useState()
    const [showIframe, setShowIframe] = useState(false)
    const [storeId, setStoreId] = useState()

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
    useEffect(() => {
        {!getTopMusicSuccess && dispatch(getTopMusic())}
    }, [])


    useEffect(() => {
        {!getLatestMusicSuccess && dispatch(getLatestMusic())}
    }, [])


useEffect( async () => {
        
        try {  
            await axios.get("http://127.0.0.1:8000/music/listofadd").then((res) => {
            setAdds(res.data)
            })
        } catch (err) {
          const error =  err.response ? err.response  : "networkError"
        }

    },[])

const handlePlayYouTubeVideo = (id) =>{
    setYoutubeId(id)
    setShowIframe(true)

}

const CloseShowIframe = () =>{
    console.log('hello');
    setShowIframe(false)
}
console.log(showIframe);

    return (
        <div>

            <div>
                <Navber />
            </div>


            <div class="main" id="mainbody">
                <div class="row" id="main_conain">
                    <div style={{textAlign:'center'}} class="column" id="left">
                        {/* first part */}
                        <h4>Top Piano Midi Downloads</h4>
                        {showIframe && 
                        <div className="songAlbum">
                        <div className="songAlbum_Colse">
                        <button  onClick={CloseShowIframe} type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                            <div>
                            <iframe width="200" height="80" src={`https://www.youtube.com/embed/${youTubeId}?&autoplay=1&enablejsapi=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                            </div>
                        </div>
                    }
                        <NavLink to="/topsong" className="myButton">See More</NavLink>
                        {getTopMusicSuccess && getTopMusicSuccess.map((music,index) =>(
                            <div>
                            < SongItem storeId={storeId} setStoreId={setStoreId} setShowIframe={setShowIframe} handlePlayYouTubeVideo={handlePlayYouTubeVideo} key={index} music={music.music} type="top"/>
                            {index===4 && (
                                <div class="cardforadd">
                                <p class="add_BOX">
                                    <div>
                                    <div dangerouslySetInnerHTML={{__html: adds && adds.add2}} />
                                    </div>
                                    </p>
                            </div>

                            )}
                             {index===9 && (
                                <div class="cardforadd">
                                <p class="add_BOX">
                                    <div dangerouslySetInnerHTML={{__html: adds && adds.add2}} />
                                </p>
                            </div>
                             )}
                           

                            {index===14 && (
                                <div class="cardforadd">
                                <p class="add_BOX">
                                <div dangerouslySetInnerHTML={{__html: adds && adds.add2}} />
                                    </p>
                            </div>
                            )}
                            </div>  
                        ))}
                    </div>

                    
                    
                    {/* <!-- -------------------2nd Column------------------------ --> */}

                    <div style={{textAlign:'center'}} class="column" id="right">
                        <h4>Newest Piano Midi Downloads</h4>
                        <NavLink to="/latestsong" className="myButton">See More</NavLink>
                        {getLatestMusicSuccess && getLatestMusicSuccess.map((music,index) =>(
                            <div> 
                            < SongItem  storeId={storeId}  setStoreId={setStoreId} setShowIframe={setShowIframe} handlePlayYouTubeVideo={handlePlayYouTubeVideo} key={index} music={music} type="let" />
                            
                            {index===4 && (
                                <div class="cardforadd">
                                <p class="add_BOX">
                                    <div dangerouslySetInnerHTML={{__html: adds && adds.add1}} />
                                    
                                     </p>
                            </div>

                            )}

                            {index===9 && (
                                <div class="cardforadd">
                                <p class="add_BOX">
                                <div dangerouslySetInnerHTML={{__html: adds && adds.add1}} />
                                 </p>
                            </div>

                            )}
                            {index===14 && (
                                <div class="cardforadd">
                                <p class="add_BOX">
                                <div dangerouslySetInnerHTML={{__html: adds && adds.add1}} />
                                     </p>
                            </div>

                            )}
                            </div>
                        ))}

                    </div>

                </div>
              
            </div>
          

            {addToCartSuccess && addToCartSuccess==='purched allready' &&  <SnackBer open={true} success_info="purched allready" />}
            {addToCartSuccess && addToCartSuccess==='already added to cart' &&  <SnackBer open={true} success_info="already added to cart" />}

            {/* already added to cart */}
            <Footer />
        </div>
    )
}

export default HomePage
