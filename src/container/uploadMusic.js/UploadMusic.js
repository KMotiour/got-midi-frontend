import React, { useState } from 'react'
import { uploadMusic } from '../../store/action/AdminAction'
import { SET_UPLOAD_FILE, CLEAN_UPLOAD_FILE_STATUS } from '../../store/action/ActionType'
import { useDropzone } from 'react-dropzone'
import { moduleName } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'



function UploadMusic() {
    const dispatch = useDispatch()
    const [files, setFiles] = useState()
    const [price, setPrice] = useState()
    const { fileProgress } = useSelector(state => state.admin)
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)
    const [priceAvailable, setPriceAvailable] = useState(false)

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "audio/*",
        
        onDrop: (acceptedFiles) => {
            const song = []
            const music = acceptedFiles
            !price && setPriceAvailable(true)
            price && setPriceAvailable(false)
            
            { price && 
            acceptedFiles.map((file) => {
                const formData = new FormData()
                formData.append('song', file)
                formData.append('price', price ? price: 0)
                console.log(price);
                dispatch(uploadMusic(formData, file, config))
            })}


        }
    })

    console.log(price);


    return (

        <div style={{ textAlign: 'center', margin: 'auto', marginTop: '2rem' }}>

            <div className="DopfileDiv drag-area" {...getRootProps()}>
                <input  {...getInputProps()} />
                <p ><i class="fas fa-upload" style={{ marginTop: 30 }} id="uploadicon"></i></p>
                <p className="dopText">Dop/Select Files Here</p>
            </div>
            <div>
                {/* <label >
                    <span style={{ fontSize: 18, marginRight: 5 }}>Price</span> <input onChange={e => setPrice(e.target.value)} type="number" placeholder="0" />
                </label> */}
                <div class="form-group row updatefromF_A">
                <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Price:</label>
                <div class="col-sm-10">
                  <input onChange={e => {setPrice(e.target.value)}} type="number" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Price" />
                    {priceAvailable && <span style={{color:'red'}}>Price field cannot be empty</span>}
                </div>
              </div>
            </div>

            <div className="song_UPload_list">

                <div style={{ width: '90%', margin: 10, display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                    {fileProgress && Object.entries(fileProgress).length > 0 &&
                        <div style={{ display: 'flex', backgroundColor: '#c4c4c4', padding: 15, justifyContent: 'space-between', margin: 5, }}>

                            <div >Song</div>
                            <div>Status</div>

                        </div>
                    }

                    {fileProgress && Object.entries(fileProgress).map(music => (

                        <div style={{ display: 'flex', backgroundColor: '#e8e8e8', padding: 15, justifyContent: 'space-between', margin: 5, }}>
                            <div >{music[1].name} </div>
                            <div >{music[1].start === true && 'uploading...'}</div>
                            <div style={{ color: 'green' }}>{music[1].success === true && 'Successfully Uploaded'}</div>
                            <div style={{ color: 'red' }}>{music[1].error === true && 'Cannot Upload'}</div>
                        </div>

                    ))}

                </div>
                <div>
                    {fileProgress && Object.entries(fileProgress).length > 0 &&
                        <button onClick={e => dispatch({ type: CLEAN_UPLOAD_FILE_STATUS })} style={{ float: 'right' }} className="btn btn-success">Clear All</button>
                    }
                </div>


            </div>
        </div>



    )
}

export default UploadMusic
