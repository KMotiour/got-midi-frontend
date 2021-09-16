import React, { useState, useEffect } from 'react'
import Navber from '../../component/navber/Navber'
import '../../core.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchMusic } from '../../store/action/AdminAction'
import SongItemForSearch from '../../component/SongItemForSearch.js'
import axios from 'axios'
import SnackBer from '../../component/SnackBer'
import InfiniteScroll from 'react-infinite-scroll-component'
import Footer from '../../component/footer/Footer'

function TopSong() {

  const { song } = useParams()
  const { accessToken } = useSelector(state => state.auth)
  const [token, setToken] = useState('');
  const [songList, setSongList] = useState()
  const [items, setItems] = useState([])
  const [musiclist, setMusicList] = useState([])
  // const searchSonge

  const [spotify, setSpotify] = useState({
    ClientId: 'e2a65839310a4d2d84942a1901601558',
    ClientSecret: '316a2bd7ad6f4b6f831a13e7231bb017'
  })

  const dispatch = useDispatch()
  const { getTopMusicStart, getTopMusicSuccess, getTopMusicFail, } = useSelector(state => state.music)
  const { searchMusicStart, searchMusicSuccess, searchMusicFail, } = useSelector(state => state.admin)
  const { addToCartSuccess } = useSelector(state => state.music)
  const [searchStart, setSearchStart] = useState(0)
  const [searchEnd, setsearchEnd] = useState(20)
  const [searchNext, setSearchNext] = useState(true)

  const config = {
    
    headers: {
      "Content-Type": "application/json",
    },}

  useEffect(() => { 

    setSearchStart(0)
    setMusicList([])

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
        setToken(tokenResponse.data.access_token);

        const config = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokenResponse.data.access_token
        }
        axios(`https://api.spotify.com/v1/search?q=${song}&offset=${searchStart}&type=track&limit=${searchEnd}`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        }).then(res => {
          setSongList(res.data.tracks.items)
          console.log(res.data.tracks.items);
            setItems([...res.data.tracks.items])
            setSearchStart(searchStart+20)
            if(res.data.tracks.items.length==0 || res.data.tracks.items.length<20){
              setSearchNext(false)
            }
          })
      })
  }, [song])


  const fetchData = () =>{

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then(tokenResponse => {
        setToken(tokenResponse.data.access_token);

        const config = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokenResponse.data.access_token
        }

        axios(`https://api.spotify.com/v1/search?q=${song}&offset=20&type=track&limit=${searchEnd}`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        }).then(res => {
            setSongList(res.data.tracks.items)
            setItems([...items, ...res.data.tracks.items])
            setSearchStart(searchStart+20)
            if(res.data.tracks.items.length==0 || res.data.tracks.items.length<20){
              setSearchNext(false)
            }
          })
      })
  }

  useEffect(() => {
    dispatch(searchMusic(songList, config))
  }, [songList])

  useEffect(() => {
    searchMusicSuccess && setMusicList([...musiclist, ...searchMusicSuccess])
  }, [searchMusicSuccess])

  console.log(musiclist);

  return (
    <div>
      <div>
        <Navber />
      </div>
{/* 
      <InfiniteScroll
  dataLength={items && items.length ? items.length : 0} //This is important field to render the next data
  next={fetchData}
  hasMore={true}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
  // below props only if you need pull down functionality
>
  {items && items.map((song, index)=>(
    <p>{song.name}</p>
  ))}
</InfiniteScroll> */}


      <div class="main top_song_D" id="mainbody">
        <div class="row" >



          <div class="searchSong_list"> 
                  <InfiniteScroll
                        dataLength={items && items.length ? items.length : 0} //This is important field to render the next data
                        next={fetchData}
                        hasMore={searchNext}
                        loader={<h4 style={{textAlign:'center'}}>Loading...</h4>}
                        endMessage={
                          <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                        // below props only if you need pull down functionality
                      >
                        {musiclist && musiclist.map((music, index)=>(
                           < SongItemForSearch key={index} music={music} type="top" />
                        ))}
                  </InfiniteScroll>

            {songList && songList.length < 1 && (
              <h1 style={{ padding: 50 }}>No music found with this title</h1>
            )}

          </div>

        </div>


        {/* <div class="cardforadd">
           <p class="add_BOX">HI I am your ad. </p>

        </div> */}
        <Footer />
      </div>

      {addToCartSuccess && addToCartSuccess === 'purched allready' && <SnackBer open={true} success_info="purched allready" />}
      {addToCartSuccess && addToCartSuccess === 'already added to cart' && <SnackBer open={true} success_info="already added to cart" />}

    </div>
  )
}

export default TopSong
































// import React, {useState,useEffect} from 'react'
// import axios from 'axios'
// import {useParams} from 'react-router-dom'


// function SearchSong() {
//     const {song} = useParams()
//     const [token, setToken] = useState('');  
//     const [songList, setSongList] = useState()
//     const [spotify, setSpotify] = useState({
//         ClientId:'e2a65839310a4d2d84942a1901601558',
//         ClientSecret:'316a2bd7ad6f4b6f831a13e7231bb017'
//     })



//     useEffect(() => {

//         axios('https://accounts.spotify.com/api/token', {
//       headers: {
//         'Content-Type' : 'application/x-www-form-urlencoded',
//         'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
//       },
//       data: 'grant_type=client_credentials',
//       method: 'POST'
//     })
//     .then(tokenResponse => {      
//       setToken(tokenResponse.data.access_token);

//       const config = {
//         "Content-Type": "application/json",
// 		"Authorization": "Bearer "+tokenResponse.data.access_token
//     }

//     axios(`https://api.spotify.com/v1/search?q=${song}&offset=0&type=track`, {
//         method: 'GET',
//         headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
//       })
//       .then (res => {    


//         setSongList(res.data.tracks.items.slice(0,5))

//       });


//     })
//     }, [])

//     console.log(songList);


//     return (
//         <div >

//             <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
//             {songList ? songList.map(song =>(

//                 <div style={{display:'flex', justifyContent:'center'}}>
//                 <img style={{height:50, width:50}} src={song.album.images[0].url} />
//                 <span>{song.name}</span>

//                 <button className="btn btn-success">ADD to cart</button>
//                 </div>

//             ))            :
//                 <div>
//                     </div>

//             }

//             </div>
//     </div>
//     )
// }

// export default SearchSong
