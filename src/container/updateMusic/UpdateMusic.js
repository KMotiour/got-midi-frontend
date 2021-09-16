import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getSingleMusic, updateMusic} from '../../store/action/AdminAction'
import {useParams} from 'react-router-dom'
import Navber from '../../component/navber/Navber'
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import  './songupdate.css'
import SnackBer from '../../component/SnackBer'
import {NavLink} from 'react-router-dom'
import Footer from '../../component/footer/Footer'

function UpdateMusic({setOpenEditMusicForm}) {

    const dispatch = useDispatch()
    const{songId} = useParams()
    const {getSingleSongStart, getSingleSongSuccess, getSingleSongFail, updateSingleMusicStart, updateSingleMusicSuccess, updateSingleMusicFail} = useSelector(state => state.admin)
    const { accessToken} = useSelector(state => state.auth)

    const [music, setMusic] = useState()
    const [files, setFiles] = useState([])

    console.log(updateSingleMusicFail && updateSingleMusicFail.data.title);
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      useEffect(() => {
        dispatch(getSingleMusic(songId, config))
         
       }, [])

      useEffect(() => {

        setMusic(getSingleSongSuccess && getSingleSongSuccess)

      }, [getSingleSongSuccess])


 

    const handleBack = (e) =>{
        e.preventDefault()
        setOpenEditMusicForm(false)
    }

    const handleChange = (e) =>{
        setMusic(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleFile = (e) =>{
        setFiles(e.target.files[0])

    }

    const handleUpdate = (e) =>{
        e.preventDefault()
        const price = parseInt( music && music.price)>0 ? music.price : 0
        const bpm = parseInt( music && music.bpm)>0 ? music.bpm : 0

        const formData = new FormData()
        formData.append('title', music && music.title)
        formData.append('artist', music && music.artist)
        formData.append('key', music && music.key)
        formData.append('bpm', bpm)
        formData.append('description',music &&  music.description)
        formData.append('artWork', music && music.artWork)
        formData.append('spotifyId', music && music.spotifyId)
        formData.append('youtubeId', music && music.youtubeId)
        formData.append('price', price)
        // {files && formData.append('song',files)}


        {music && dispatch(updateMusic(music.id, formData, config))}
        

    }

    return (
        <div >
            <div>
            <Navber />
            </div>
        <div class="sidebar" style={{marginTop:80,}}>
        <NavLink to='/admin'> <i class="fas fa-arrow-alt-circle-left"></i><span> </span> Back</NavLink>
       
            </div>

<div class="main content" id="mainAdmindiv" style={{marginTop:0,}}>
       
       <div className="songUpdateDataCard" id="updatesongdata">

         <div class="form-group row updatefrom">
           <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Title:</label>
           <div class="col-sm-10">
             <input onChange={handleChange} name="title" value={music && music.title} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Title" />
            <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.title}</span>
           </div>
         </div>

         <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Artist:</label>
             <div class="col-sm-10">
               <input onChange={handleChange} name="artist" value={music && music.artist} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Artist" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.artist}</span>
             </div>
           </div>

           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Key:</label>
             <div class="col-sm-10">
               <input onChange={handleChange} name="key" value={music && music.key} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Key" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.key}</span>
             </div>
           </div>

           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Bpm:</label>
             <div class="col-sm-10">
               <input onChange={handleChange}  name="bpm" value={music && music.bpm} type="number" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Bpm" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.bpm}</span>
             </div>
           </div>
           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Description:</label>
             <div class="col-sm-10">
             <textarea onChange={handleChange} name="description" value={music && music.description} class="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
             <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.description}</span>
             </div>
           </div>
           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ArtWork:</label>
             <div class="col-sm-10">
               <input onChange={handleChange} name="artWork" value={music && music.artWork} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="ArtWork" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.artWork}</span>
             </div>
           </div>
           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">SpotifyId:</label>
             <div class="col-sm-10">
               <input onChange={handleChange} name="spotifyId" value={music && music.spotifyId} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="SpotifyId" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.spotifyId}</span>
             </div>
           </div>
           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">YoutubeId:</label>
             <div class="col-sm-10">
               <input onChange={handleChange}  name="youtubeId" value={music && music.youtubeId} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="YoutubeId" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.youtubeId}</span>
             </div>
           </div>
           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Price:</label>
             <div class="col-sm-10">
               <input onChange={handleChange} name="price" value={music && music.price} type="number" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Price" />
               <span style={{color:'red'}}>{updateSingleMusicFail && updateSingleMusicFail.data && updateSingleMusicFail.data.price}</span>
             </div>
           </div>
           <div class="form-group row updatefrom">
             <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Song:</label>
             <div class="col-sm-10">
                 <label  for="exampleFormControlFile1" >Currently: <span  style={{fontSize: 14}}><a href={music && music.song} target="_blank">{music && music.song}</a></span></label>
                 <input onChange={handleFile} type="file" class="form-control" id="customFile" />
             </div>
           </div>
           
           <div class="form-group row updatefrom frombtn">
             <button onClick={handleBack} type="button my-2" class="btn btn-outline-secondary">Back</button>
            {updateSingleMusicStart ? <Spin size="large" /> : 
                <button onClick={handleUpdate} type="button" class="btn btn-outline-success">Update</button>
            }
            </div>
       
    
     </div>
     <Footer />
   </div>
   {updateSingleMusicSuccess && <SnackBer open={true} success_info="update successfully" />}
        </div>
    )
}

export default UpdateMusic
