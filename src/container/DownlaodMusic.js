import React, {useState, useEffect} from 'react'
import Navber from '../component/navber/Navber'
import image from '../img/song_img2.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {purchedMusicList} from '../store/action/MsuicAction'
import SongItem from '../component/SongItem'
import '../core.css'
import Footer from '../component/footer/Footer'



function TopSong() {


    const dispatch = useDispatch()
    const { getPuchsedItemSuccess} = useSelector(state => state.music)
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
    
    useEffect(() => {
        
        dispatch(purchedMusicList(config))
           
    }, [])

    return (
        <div>
            <div>
                <Navber />
            </div>

            <div class="main" id="downloadpage">
            <div className="asideM_div">
                <div className="maincontainS">


                    <div class="TopPianoMIdiD">
                      <h4 >Download your midi</h4>

                    {getPuchsedItemSuccess && getPuchsedItemSuccess[0].music.map((music,index) =>(
                            < SongItem key={index} music={music} type="download"/>
                        ))}
                    </div>

                 

                    
                    {/* <div class="cardforadd">
                        <p class="add_BOX">HI I am your ad. </p>

                    </div> */}
            
                    </div>

                    <div className="aside_add">
        <h4>Piano Midi songs for SYNTHESIA </h4>
        <p>
        Buying expensive Midi files is now a thing of the past. Our midi service is affordable and a growing new database of Midi files in piano format.
            </p>
            <p>
            All of our midi songs can be used in Synthesia! All our midi songs can converted to sheet music using a free download app www.musescore.org
                    </p>
         </div>

    </div>
    
            </div>
            <br />
<br />

            <Footer />
        </div>
    )
}

export default TopSong
