import React,{useEffect, useState} from 'react'
import Navber from '../navber/Navber'
import './contact.css'
import Footer from '../footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import {getExtraInfo, createExtraInfo} from '../../store/action/AdminAction'

function AboutUs() {


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

                    <article id="post-61" class="post-61 page type-page status-publish hentry">

                        <div class="entry">
                            
                            <div dangerouslySetInnerHTML={{__html: getExtraInfosuccess && getExtraInfosuccess.aboutUs}} />

                        </div>

                    </article>



                </section>
<br/>
<br/>
<br/>
            </div>
            <footer class="bg-light text-center text-lg-start" id="footer">
                <Footer />

            </footer>
        </div>
    )
}

export default AboutUs
