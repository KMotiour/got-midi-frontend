import React, { useState, useEffect } from 'react'
import Navber from '../component/navber/Navber'
import '../core.css'
import { Modal } from 'antd';
import {useHistory, NavLink} from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getTopMusic, getAllMusic } from '../store/action/MsuicAction'
import ShowYoutubeVideo from '../component/showYoutubeVideo/ShowYoutubeVideo'
import MusicItem from './MusicItem'
import SnackBer from '../component/SnackBer'
import { deleteListOfMusic, updateTopList } from '../store/action/AdminAction'
import { UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS } from '../store/action/ActionType'
import UpdateMusic from './updateMusic/UpdateMusic'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Step } from '@material-ui/core';
function LatestSong() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { getAllMusicSuccess, addToCartSuccess } = useSelector(state => state.music)
    const { authStart, accessToken, authFail } = useSelector(state => state.auth)
    const {get_user_info_success} = useSelector(state => state.user)
    const { deleteListOfMusicStart, deleteListOfMusicSuccess, deleteListOfMusicFail } = useSelector(state => state.admin)
    const {updateTopListStart, updateTopListSuccess, updateTopListFail } = useSelector(state => state.admin)
    const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
    const [songId, setSongId] = useState()
    const [singleMusic, setSingleMusic] = useState()
    const [openEditMusicForm, setOpenEditMusicForm] = useState(false)
    const [musics, setMusics] = useState([])
    const [searchInput, setSearchInput] = useState()
    const [p, setP] = useState(1)
    const [searchNext, setSearchNext] = useState(true)
    const [dataUpdate, setDataUpdate] = useState('newData')
    const [getIndex, setGetIndex] = useState()
    const [showPuseIcon, setShowPouseIcon] = useState(false)
    const [deleteAll, setDeleteAll] = useState(false)
    

    console.log(deleteListOfMusicStart, deleteListOfMusicSuccess, deleteListOfMusicFail);

    
    useEffect(() => { 

        deleteListOfMusicSuccess && deleteAll===true && window.location.reload()
       
    }, [deleteListOfMusicSuccess])

    useEffect(() => {
        let index ='' 
        if (updateTopListSuccess && updateTopListSuccess[0]){
            const newList = musics.filter((song, itemIndex) =>{
                if(song.id === updateTopListSuccess[0] ){
                    index = itemIndex
                }})

            
        console.log(index, 'ne list');
        const newArr = [...musics]
        newArr[index] = {
            ...newArr[index],
            in_favourite:true


        }
        setMusics(newArr)
    }
       
    }, [updateTopListSuccess])
    // console.log(musics);
    
    // update music list after deleting music
    useEffect(() => {

        if(deleteListOfMusicSuccess && deleteListOfMusicSuccess.length>0){
            
            deleteListOfMusicSuccess.map(id =>{
                console.log(id, 'ppppppppppp');
                setMusics(musics.filter(mus=> mus.id!==id))

            })

        } 
       
    }, [deleteListOfMusicSuccess])


    // set Data to State
    useEffect(() => {
        
        if(dataUpdate==='newData'){
            getAllMusicSuccess && getAllMusicSuccess.results &&
        setMusics([...musics, ...getAllMusicSuccess.results])
        }else{
            getAllMusicSuccess && getAllMusicSuccess.results &&
            setMusics([...getAllMusicSuccess.results])
        }
            
     }, [getAllMusicSuccess &&  getAllMusicSuccess.results])



    const config = {
        headers: {
            "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
        },
    };

    useEffect(() => {
        
       !getAllMusicSuccess && dispatch(getAllMusic('', p)) 
       setP(p+1)
       if(getAllMusicSuccess &&  getAllMusicSuccess.results.length==0 || 
        getAllMusicSuccess &&  getAllMusicSuccess.results.length<3){
            setSearchNext(false)
        }

    }, [])


    useEffect(() => {

        if (deleteListOfMusicSuccess === true) {
            dispatch(getAllMusic('', p))
            dispatch({ type: UPDATE_DELETE_LIST_OF_MUSIC_SUCCESS })

        }

    }, [deleteListOfMusicSuccess])

    const fetchData = () =>{
        setDataUpdate('newData')
        dispatch(getAllMusic('', p))
        setP(p+1)
        if(getAllMusicSuccess &&  getAllMusicSuccess.results.length==0 || 
            getAllMusicSuccess &&  getAllMusicSuccess.results.length<3){
                setSearchNext(false)
            }
    }

    const playMusic = (id) => {
        setShowPouseIcon(true)
        setSongId(id)
        setShowYoutubeVideo(true)
    }

    const closeMusicPlay = () =>{
        setShowYoutubeVideo(false)
        setShowPouseIcon(false)
        setSongId()
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
        setDeleteAll(true)
        e.preventDefault()
        const fruits = [];
        musics.map(music => {
            if (music.isChecked) {
                fruits.push(music.id)
            }
        })
        {fruits.length>0 && dispatch(deleteListOfMusic(fruits, config))}
      
    }
    

    const deleteSingleItem = (id) =>{
        setDataUpdate('delete')
        const fruits = [];
        fruits.push(id)
        {fruits.length>0 && dispatch(deleteListOfMusic(fruits, config))}
    }

    // search song 
    const handleSearchInputChante = (e) =>{
        setSearchNext(true)
        setDataUpdate('search')
        setP(1)
        dispatch(getAllMusic(e, 1))
        setP(2)
        
    }
 
    const handleUpdateTopList = (id) =>{
        const ids=['single']
        setDataUpdate('addToTop')
          ids.push(id)
          dispatch(updateTopList(ids, config, p)) 
      } 

    return (
        <div>
            <div>
                <Navber />
            </div>
            <div class="sidebar">
        <NavLink to='/admin'><i class="fas fa-arrow-alt-circle-left"></i><span> </span>Back</NavLink>
       
            </div>



            {showYoutubeVideo &&
               <div className="songAlbum">
                        <div className="songAlbum_Colse">
                        <button  onClick={closeMusicPlay} type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                            <div>
                            <iframe width="200" height="80" src={`https://www.youtube.com/embed/${songId}?&autoplay=1&enablejsapi=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                            </div>
                        </div>
            
            
            }
            <div>
                 <div class="content" id="mainAdmindiv">
                     <div className="contents">

                    
               <div className="MusicPage">
    

                <div class="row" >
                   
                    <div class="" id="admin_songlist">
                    
                        <div style={{ width: '100%', marginTop: 20, marginLeft: 10 }}>
                            <div className="musicTopbar">
                              
    
                                <div className="songselect">
                                <label><input
                                    checked={musics && musics.filter(music => music?.isChecked !== true).length < 1}
                                    onClick={handleChange}
                                    name="allSelect"
                                    type="checkbox" />
                                    Select All
                                </label>
                                </div>    
                               
                      
                          <div class="form-group has-search" id="musicsearch">
                                <span class="fa fa-search form-control-feedback" id="searchIcon"></span>
                                <input type="text" class="form-control" onChange={e => {handleSearchInputChante(e.target.value)}} placeholder="Search" />
                            </div>
                        <div>
                            {deleteListOfMusicStart ?
                                    <div style={{ marginRight: 70, marginLeft: 'auto' }}>
                                        <Spin size="large" />
                                    </div>

                                    :
                                    <button className=" btn btn-danger" onClick={handleDeleteListOfMusic} style={{ marginRight: 20, marginLeft: 'auto' }}>Delete selected songs</button>
                                }
                            </div>
                                
                            </div>
                        </div>

                           <InfiniteScroll
                        dataLength={musics && musics.length ? musics.length : 0} //This is important field to render the next data
                        next={fetchData}
                        hasMore={searchNext}
                        loader={<h4 style={{textAlign:'center'}}>Loading...</h4>}
                        endMessage={
                          <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }    
                      >
                        {musics && musics.map((music, index) => (
                            <div key={index} class="single_songDetels" style={{ marginTop: 20 }}>
                                <ul class="flex-container" style={{ marginTop: "2rem", marginBottom: "2rem" }} id="MusicListaline">

                                    <label style={{ display: 'flex' }}>
                                        
                                        <input checked={music?.isChecked || false} type="checkbox" style={{ margin: 5 }}
                                            id={music.id} onChange={handleChange} />
                                    </label>
                                        <li class="flex-item flex1">
                                            <div class="videoimg">
                                                <img src={music.artWork} alt="" width="8rem" />
                                                <div class="overlay" >
                                                {/* closeMusicPlay */}
                                                    {songId!==music.youtubeId  && 
                                                    <a onClick={e => { playMusic(music.youtubeId) }} class="icon" title="Play">
                                                        <i class="fas fa-play"></i>
                                                    </a>
                                                    }

                                                    {songId==music.youtubeId && 
                                                        <a onClick={e=> closeMusicPlay()} class="icon" title="Play">
                                                            <i  class="fas fa-window-close"></i>
                                                        </a>
                                                        }
                                                
                                                
                                                </div>
                                            </div>
                                        </li>
                                   

                                    
                                    <li style={{ cursor: 'pointer' }} class="flex-item flex2">
                                        <h6 style={{marginBottom:5}}>{music.artist}</h6>
                                    <NavLink to={'/updatemusic/'+music.id} >
                                        <p> {music.title}</p>
                                        <div id="song_data">
                                            <span class="labels">{music.key}<br /><span class="small_subtitle">Key</span></span>
                                            <span class="labels">{music.bpm}<br /><span class="small_subtitle">BPM</span></span>
                                        </div>
                                        </NavLink>
                                    </li>
                                   
                                    <li class="flex-item flex3" id="MusicListflex3">


                                        <button class="btn" id="addtoCard" title="Price"> ${music.price} </button>
                                        {music.in_favourite ?
                                         <button class="btn" id="addtoCard" title="Already in toplist">Top listed </button>
                                        : 
                                        <button onClick={e=>{handleUpdateTopList(music.id)}} class="btn" id="addtoCard" title="Make toplist"> Add to top list </button>
                                    }
                                  
                                        <button onClick={e=>{deleteSingleItem(music.id)}} class="btn" id="addtoCard" title="Delete"> <i class="fas fa-trash-alt"></i></button>
                                        
                                    </li>
                                </ul>
                            </div>
                        ))}
                        </InfiniteScroll>
                    </div>
                </div>


                {/* <div class="cardforadd">
                    <p class="add_BOX">HI I am your ad. </p>

                </div> */}
                </div>
                </div>
            </div>
            </div>
            {addToCartSuccess && addToCartSuccess === 'purched allready' && <SnackBer open={true} success_info="purched allready" />}
            {addToCartSuccess && addToCartSuccess === 'already added to cart' && <SnackBer open={true} success_info="already added to cart" />}
            {updateTopListSuccess && <SnackBer  open={true} success_info="added toplist"/>}
        </div>
    )
}

export default LatestSong
