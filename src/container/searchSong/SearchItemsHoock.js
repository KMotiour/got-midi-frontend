import React, {useEffect, useState } from 'react'
import axios from 'axios'



export default function SearchItemsHoock(song, searchStart, searchEnd) {
    
    
    

    const [spotify, setSpotify] = useState({
        ClientId: 'e2a65839310a4d2d84942a1901601558',
        ClientSecret: '316a2bd7ad6f4b6f831a13e7231bb017'
      })
    useEffect(() =>{

        axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
       
        const config = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokenResponse.data.access_token
        }

        axios(`https://api.spotify.com/v1/search?q=${song}&offset=${searchStart}&type=track&limit=${searchEnd}`, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        })
          .then(res => {
            console.log(res.data.tracks.items)
            // setSongList(res.data.tracks.items)
          })
      })

    }, [searchStart, searchEnd])

    return null

}