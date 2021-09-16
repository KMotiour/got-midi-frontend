import React, { useState, useEffect } from 'react'
import Navber from '../../component/navber/Navber'
import '../../core.css'
import { Modal } from 'antd';
import {useHistory, NavLink} from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

import SnackBer from '../../component/SnackBer'
import { getSoldMusicHistory, deleteSoldHistory } from '../../store/action/AdminAction'
import { UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS } from '../../store/action/ActionType'
import Footer from '../../component/footer/Footer'

function LatestSong() {

    const dispatch = useDispatch()
    const { getAllMusicSuccess, addToCartSuccess } = useSelector(state => state.music)
    const { authStart, accessToken, authFail } = useSelector(state => state.auth)
    const { getSoldMusicHistoryStart, getSoldMusicHistorySuccess, 
        getSoldMusicHistoryFail, deleteSoldMusicHistoryStart,
        deleteSoldMusicHistorySuccess,
        deleteSoldMusicHistoryFail} = useSelector(state => state.admin)

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

    useEffect(() => {

        { !getSoldMusicHistorySuccess && dispatch(getSoldMusicHistory(config)) }

    }, [])


    // useEffect(() => {

    //     if (deleteListOfMusicSuccess === true) {
    //         dispatch(getAllMusic())
    //         dispatch({ type: UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS })

    //     }

    // }, [deleteListOfMusicSuccess])

    const handleChange = (e) => {

        const { id, name, checked } = e.target

        if (name === "allSelect") {
            let tempMusic = musics.map(user => {
                return { ...user, isChecked: checked }
            })
            setMusics(tempMusic)
        } else {
            let tempMusic = musics.map(music => music.id == id ? { ...music, isChecked: checked } : music)
            console.log(tempMusic);
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


    return (
        <div>
            <div >
                
               <div>
                <div class="row" >

                    <div class="" id="admin_songlist">
                        <div style={{ width: '100%', marginTop: 20, marginLeft: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'first baseline' }}>
                                {/* all check */}
                                <label><input
                                   
                                    onClick={handleChange}
                                    name="allSelect"
                                    type="checkbox" />
                                    Select All
                                </label>

                                {/* <button className=" btn btn-danger" onClick={handleDeleteListOfMusic} style={{ marginRight: 20, marginLeft: 'auto' }}>Delete selected songs</button> */}

                                {deleteSoldMusicHistoryStart ?
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
                                                <img src={music.music.artWork} alt="" width="8rem" />
                                                <div class="overlay">
                                                    <a class="icon" title="Play">
                                                        <i class="fas fa-play"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </label>

                                    
                                    <li style={{ cursor: 'pointer' }} class="flex-item flex2"><p>{music.title}</p>
                                    
                                        <h6>{music.music.artist}</h6>
                                        <div id="song_data">
                                            <span class="labels">{music.music.key}<br /><span class="small_subtitle">Key</span></span>
                                            <span class="labels">{music.music.bpm}<br /><span class="small_subtitle">BPM</span></span>
                                        </div>
                                       
                                    </li>
                                   
                                    <li class="flex-item flex3">

                                        <button class="btn" id="addtoCard" title="Add to cart"> ${music.music.price} </button>


                                        {/* <button style={{ marginTop:-15}} class="btn" id="addtoCard" title="Add to Cart"> AddToCart </button> */}
                                    </li>
                                </ul>


                            </div>
                                


                        ))}
                        <button className="btn btn-primary" style={{float:'right'}}>Total Sold Ammount :{getSoldMusicHistorySuccess && getSoldMusicHistorySuccess[0].total_sold.music__price__sum}</button>
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
