import React, { useState, useEffect } from 'react'
import {NavLink} from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import SnackBer from '../../component/SnackBer'
import { getSoldMusicHistory, deleteSoldHistory } from '../../store/action/AdminAction'


function LatestSong() {

    const dispatch = useDispatch()
    const {addToCartSuccess } = useSelector(state => state.music)
    const { authStart, accessToken, authFail } = useSelector(state => state.auth)
    const { getSoldMusicHistoryStart,
        getSoldMusicHistorySuccess,
        getSoldMusicHistoryFail} = useSelector(state => state.admin)
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
    const [songId, setSongId] = useState()
    const [singleMusic, setSingleMusic] = useState()
    const [openEditMusicForm, setOpenEditMusicForm] = useState(false)
    const [musics, setMusics] = useState()


    useEffect(() => {
        getSoldMusicHistorySuccess && setMusics(getSoldMusicHistorySuccess)

    }, [getSoldMusicHistorySuccess])


    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
        },
    };
    console.log(config);

    useEffect(() => {

        { !getSoldMusicHistorySuccess && dispatch(getSoldMusicHistory(config)) }

    }, [])

    console.log(getSoldMusicHistorySuccess,'success');

    // useEffect(() => {

    //     if (deleteListOfMusicSuccess === true) {
    //         dispatch(getAllMusic())
    //         dispatch({ type: UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS })

    //     }

    // }, [deleteListOfMusicSuccess])

    const playMusic = (id) => {
        setSongId(id)
        setShowYoutubeVideo(true)
    }

    const handleChange = (e) => {

        const { id, name, checked } = e.target

        if (name === "allSelect") {
            let tempMusic = musics.map(user => {
                return { ...user, isChecked: checked }
            })
            setMusics(tempMusic)
        } else {
            let tempMusic = musics.map(music => music.id == id ? { ...music, isChecked: checked } : music)
            setMusics(tempMusic)
        }
    }

    const handleDeleteListOfMusic = (e) => {
        e.preventDefault()
        const fruits = [];
        musics.map(music => {
            if (music.isChecked) {
                fruits.push(music.id)
            }
        })
        {fruits.length>0 && dispatch(deleteSoldHistory(fruits, config))}
    }

    const HandleEditSong = (music) => {
        
        setSingleMusic(music)
        setOpenEditMusicForm(true)
    }

    return (
        <div>
            {showYoutubeVideo && <ShowYoutubeVideo open={true} youtubeID={songId} setShowYoutubeVideo={setShowYoutubeVideo} />}
            <div >
                
               <div>
                <div class="row" >

                    <div class="single_songDetels" id="admin_songlist">
                        <div style={{ width: '100%', marginTop: 20, marginLeft: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'first baseline' }}>
                                {/* all check */}
                                <label><input
                                    checked={musics && musics.filter(music => music?.isChecked !== true).length < 1}
                                    onClick={handleChange}
                                    name="allSelect"
                                    type="checkbox" />
                                    Select All
                                </label>



                                {deleteListOfMusicStart ?
                                    <div style={{ marginRight: 70, marginLeft: 'auto' }}>
                                        <Spin size="large" />
                                    </div>

                                    :
                                    <button className=" btn btn-danger" onClick={handleDeleteListOfMusic} style={{ marginRight: 20, marginLeft: 'auto' }}>Delete selected songs</button>
                                }
                            </div>


                        </div>
                        {musics && musics.map((music, index) => (


                            <div key={index} class="single_songDetels" style={{ marginTop: 20 }}>



                                <ul class="flex-container" style={{ marginTop: "2rem", marginBottom: "2rem" }}>

                                    {/* single check */}
                                    <label style={{ display: 'flex' }}>
                                        <input checked={music?.isChecked || false} type="checkbox" style={{ margin: 5 }}
                                            id={music.id} onChange={handleChange} />

                                        <li class="flex-item flex1">
                                            <div class="videoimg">
                                                <img src={music.artWork} alt="" width="8rem" />
                                                <div class="overlay" onClick={e => { playMusic(music.youtubeId) }}>
                                                    <a class="icon" title="Play">
                                                        <i class="fas fa-play"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </label>

                                    
                                    <li style={{ cursor: 'pointer' }} class="flex-item flex2"><p>{music.title}</p>
                                    <NavLink to={'/updatemusic/'+music.id} >
                                        <h6>{music.artist}</h6>
                                        <div id="song_data">
                                            <span class="labels">{music.key}<br /><span class="small_subtitle">Key</span></span>
                                            <span class="labels">{music.bpm}<br /><span class="small_subtitle">BPM</span></span>
                                        </div>
                                        </NavLink>
                                    </li>
                                   
                                    <li class="flex-item flex3">

                                        <button class="btn" id="addtoCard" title="Add to cart"> ${music.price} </button>


                                        {/* <button style={{ marginTop:-15}} class="btn" id="addtoCard" title="Add to Cart"> AddToCart </button> */}
                                    </li>
                                </ul>


                            </div>



                        ))}
                    </div>
                </div>


                {/* <div class="cardforadd">
                    <p class="add_BOX">HI I am your ad. </p>

                </div> */}
                </div>
            </div>
            {addToCartSuccess && addToCartSuccess === 'purched allready' && <SnackBer open={true} success_info="purched allready" />}
            {addToCartSuccess && addToCartSuccess === 'already added to cart' && <SnackBer open={true} success_info="already added to cart" />}

        </div>
    )
}

export default LatestSong
