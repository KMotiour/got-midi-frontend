import React, {useState, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux'
import {getExtraInfo, createExtraInfo} from '../../store/action/AdminAction'
import SnackBer from '../../component/SnackBer'


function CreateContactUs() {
    
    const [contactUs, setContactUs] = useState("")
    const dispatch = useDispatch()
    const { getExtraInfoStart, getExtraInfosuccess,createExtraInfosuccess, getExtraInfoFail } = useSelector(state => state.admin)
    const {accessToken} = useSelector(state => state.auth)
    console.log(getExtraInfoStart, createExtraInfosuccess, getExtraInfoFail);
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
    
    
    useEffect(() => {
        !getExtraInfosuccess && dispatch(getExtraInfo())
    }, [])

    useEffect(() => {
        getExtraInfosuccess && setContactUs(getExtraInfosuccess.contactUs)
    }, [getExtraInfosuccess])

    const SubmitAboutInfo = () =>{
        const formData  = new FormData()
        formData.append('contactUs', contactUs)
        dispatch(createExtraInfo(formData, config))
    }

    const handleChange = (e, editor) =>{
        const data = editor.getData()
        setContactUs(data)
    }

    
    return (
        <div>
            <p style={{margin:10, fontSize:30, textAlign:'center'}}>Contact</p>
            
            <div style={{width:'80%', margin:'auto'}}>
            <CKEditor
                    editor={ ClassicEditor }
                    data={contactUs}
                    
                    onChange={handleChange}
                    
                />
                <div>
                    <button onClick={SubmitAboutInfo}>Submit</button>
                </div>

            </div>

            {createExtraInfosuccess && <SnackBer open="true" success_info="aboutus updated"/>}
        </div>
    )
}

export default CreateContactUs
