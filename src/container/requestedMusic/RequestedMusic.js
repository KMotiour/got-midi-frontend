// import React, {useState, useEffect} from 'react'
// import {getRequestedMusicList} from '../../store/action/AdminAction'
// import {useDispatch, useSelector} from 'react-redux'


// function RequestedMusic() {

//     const dispatch = useDispatch()
//     const {getRequestedMusicStart,
//             getRequestedMusicSuccess,
//             getRequestedMusicFail,} = useSelector(state => state.admin)

//     const { accessToken} = useSelector(state => state.auth)
//     const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + accessToken,
//         },
//       };

//       useEffect(() => {
//         {!getRequestedMusicSuccess && dispatch(getRequestedMusicList(config))}
//       }, [])


//       console.log(getRequestedMusicSuccess);
    
//     return (
//         <div>
            
//         </div>
//     )
// }

// export default RequestedMusic




import React, { useState, useEffect } from 'react'
import Navber from '../../component/navber/Navber'
import '../../core.css'
import { Modal } from 'antd';
import {useHistory, NavLink} from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

import SnackBer from '../../component/SnackBer'
import {getRequestedMusicList, deleteRequestedMusicList } from '../../store/action/AdminAction'
import { UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS } from '../../store/action/ActionType'

function LatestSong() {

    const dispatch = useDispatch()
    const { getAllMusicSuccess, addToCartSuccess } = useSelector(state => state.music)
    const { authStart, accessToken, authFail } = useSelector(state => state.auth)
    const {getRequestedMusicStart, getRequestedMusicSuccess, getRequestedMusicFail,
        deleteRequestedMusicStart, deleteRequestedMusicSuccess, deleteRequestedMusicFail, 
        } = useSelector(state => state.admin)

        console.log( deleteRequestedMusicStart, deleteRequestedMusicSuccess, deleteRequestedMusicFail);
    const [musics, setMusics] = useState()

    useEffect(() => {
        getRequestedMusicSuccess && setMusics(getRequestedMusicSuccess)

    }, [getRequestedMusicSuccess])

     
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          };
    
          useEffect(() => {
            dispatch(getRequestedMusicList(config))
          }, [])
    
    
          console.log(getRequestedMusicSuccess);
        



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
        console.log(fruits);
        {fruits.length>0 && dispatch(deleteRequestedMusicList(fruits, config))}
    }
    const deleteSingleItem = (id) =>{
        const fruits = [];
        fruits.push(id)
        console.log(fruits)
        {fruits.length>0 && dispatch(deleteRequestedMusicList(fruits, config))}

    }
    console.log(musics);


    return (
        <div>
            <div >
                
               <div className="pageMaindiv">
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

                                {deleteRequestedMusicStart ?
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

<section className="section">
        
      <div class="row">
        <div class="col">
        <label >
                                        <input checked={music?.isChecked || false} type="checkbox" style={{ margin: 5 }}
                                            id={music.id} onChange={handleChange} />
                                            {music.title}
                                            </label>
        </div>
        <div className="RequestedAction">
        <div class="col div_Aline">
        <a href={music.spotifyLink}  >
                                        <h6 style={{color: '#1ed760'}}><i class="fab fa-spotify" style={{fontSize: '20px'}}></i></h6>
                                       </a>
        </div>
        <div class="col div_Aline"> 
        <p style={{color: 'black'}}>{music.count}</p>
        </div>
        <div class="col div_Aline"> 
        <p style={{color: 'black'}}><i class="fas fa-trash-alt" onClick={e => {deleteSingleItem(music.id)}}></i></p>

        </div>
        </div>
      </div>
    </section>

                                {/* <ul class="flex-container" style={{ marginTop: "2rem", marginBottom: "2rem", display:'flex', alignItems:'baseline'}}>
                                    
                                      
                                   

                                        <li >
                                        <label >
                                        <input checked={music?.isChecked || false} type="checkbox" style={{ margin: 5 }}
                                            id={music.id} onChange={handleChange} />
                                            {music.title}
                                            </label>

                                        </li>

                                    
                                    <li style={{ cursor: 'pointer',textAlign:"right"}} class="flex-item flex2">
                                    
                                        <a href={music.spotifyLink}  >
                                        <h6 style={{color: '#1ed760'}}><i class="fab fa-spotify" style={{fontSize: '20px'}}></i></h6>
                                       </a>
                                       
                                    </li>
                                   
                                    <li class="flex-item flex3">

                                        <p style={{color: 'black',marginRight: '2rem'}}>{music.count}</p>


                                    
                                    </li>
                                    <li class="flex-item flex4" onClick={e => {deleteSingleItem(music.id)}}>

                                        <p style={{color: 'black'}}><i class="fas fa-trash-alt"></i></p>


                                    
                                    </li>
                                </ul> */}


                            </div>
                                


                        ))}
                      
                    </div>
                    
                    
                </div>


                <div class="cardforadd">
                    <p class="add_BOX">HI I am your add. </p>

                </div>
                </div>
            </div>
            {deleteRequestedMusicSuccess &&  <SnackBer open={true} success_info="delete requested list" />}

        </div>
    )
}

export default LatestSong
