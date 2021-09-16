import React, { useState, useEffect } from 'react'
import Navber from '../component/navber/Navber'
import '../core.css'
import image from '../img/song_img2.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getTopMusic, getAllMusic } from '../store/action/MsuicAction'
import SongItem from '../component/SongItem'
import SnackBer from '../component/SnackBer'
import InfiniteScroll from 'react-infinite-scroll-component'
import Footer from '../component/footer/Footer'

function LatestSong() {
    const [p, setP] = useState(1)
    const dispatch = useDispatch()
    const { getTopMusicStart, getTopMusicSuccess, getTopMusicFail,
        getLatestMusicStart, getAllMusicSuccess, getLatestMusicFail, addToCartSuccess } = useSelector(state => state.music)
    const [allSong, setAllSong] = useState([])
    const [searchNext, setSearchNext] = useState(true)
    const [youTubeId, setYoutubeId] = useState()
    const [showIframe, setShowIframe] = useState(false)
    const [storeId, setStoreId] = useState()

    useEffect(() => {
        console.log('use Eff')
        !getAllMusicSuccess && dispatch(getAllMusic('', p))
        setP(p + 1)
        if (getAllMusicSuccess && getAllMusicSuccess.results.length == 0 ||
            getAllMusicSuccess && getAllMusicSuccess.results.length < 3) {
            setSearchNext(false)
        }


    }, [])

    const fetchData = () => {
        console.log(p);
        console.log('fuction');
        dispatch(getAllMusic('', p))
        setP(p + 1)

        if (getAllMusicSuccess && getAllMusicSuccess.results.length == 0 ||
            getAllMusicSuccess && getAllMusicSuccess.results.length < 3) {
            setSearchNext(false)
        }

    }

    useEffect(() => {

        getAllMusicSuccess && getAllMusicSuccess.results &&
            setAllSong([...allSong, ...getAllMusicSuccess.results])

    }, [getAllMusicSuccess && getAllMusicSuccess.results])

    const handlePlayYouTubeVideo = (id) => {
        setYoutubeId(id)
        setShowIframe(true)
    }

    const CloseShowIframe = () => {
        setShowIframe(false)
    }
    return (
        <div>
            <div>
                <Navber />
            </div>
            <div class="main latest_P_D">
                {showIframe &&
                    <div className="songAlbum">
                        <div className="songAlbum_Colse">
                            <button onClick={CloseShowIframe} type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div>
                            <iframe width="200" height="80" src={`https://www.youtube.com/embed/${youTubeId}?&autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        </div>

                    </div>
                }
                <div class="row" >
                    <div className="asideM_div">
                        <div className="maincontainS">


                            <div class="TopPianoMIdiD">
                                <h4 >Newest Piano Midi Downloads</h4>
                                <InfiniteScroll
                                    dataLength={allSong && allSong.length ? allSong.length : 0} //This is important field to render the next data
                                    next={fetchData}
                                    hasMore={searchNext}
                                    loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                                    endMessage={
                                        <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }

                                >
                                    {allSong &&
                                        allSong.map((music, index) => (
                                            < SongItem storeId={storeId} setStoreId={setStoreId} setShowIframe={setShowIframe} handlePlayYouTubeVideo={handlePlayYouTubeVideo} key={index} music={music} type="all" />
                                        ))}
                                </InfiniteScroll>


                            </div>
                        </div>
                        <div className="aside_addP side__data">
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
<br />
                <Footer />
            </div>
            {addToCartSuccess && addToCartSuccess === 'purched allready' && <SnackBer open={true} success_info="purched allready" />}
            {addToCartSuccess && addToCartSuccess === 'already added to cart' && <SnackBer open={true} success_info="already added to cart" />}

        </div>
    )
}

export default LatestSong
