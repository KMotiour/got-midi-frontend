import React,{useEffect, useState} from 'react'
import Navber from '../navber/Navber'
import './contact.css'
import Footer from '../footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import {getExtraInfo, createExtraInfo} from '../../store/action/AdminAction'

function ContruchUs() {

    const dispatch = useDispatch()
    const { getExtraInfoStart, getExtraInfosuccess, getExtraInfoFail } = useSelector(state => state.admin)
    
    useEffect(() => {

        dispatch(getExtraInfo())

    }, [])
    console.log(getExtraInfoStart, getExtraInfosuccess, getExtraInfoFail);

    return (
        <div>
            <div>
                <Navber />
            </div>

                <div class="main">
        <section id="main">
        <div class="entry-content">
            
        <div dangerouslySetInnerHTML={{__html: getExtraInfosuccess && getExtraInfosuccess.contactUs}} />
                    </div>
           

</section>

</div>
<footer class="bg-light text-center text-lg-start" id="footer">
    <Footer />

  </footer>
        </div>
    )
}

export default ContruchUs
