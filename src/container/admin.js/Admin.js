import React, { useState } from 'react'
import './addminPage.css'
import Navber from '../../component/navber/Navber'
import MusicList from '../MusicList'
import UploadMusic from '../uploadMusic.js/UploadMusic'
import CreateTopList from '../topChart/CreateTopList'
import RequestedMusic from '../requestedMusic/RequestedMusic'
import SellReport from '../sellReport/SellReport'
import CreateAds from '../../container/createAds/CreateAds'
import CreateAboutUs from '../createAboutUs/CreateAboutUs'
import CreateContactUs from '../createContactUs/CreateContactUs'
import CreateLegal from '../createLegal/CreateLegal'
import CreateTermsAndConditions from '../createTermsAndConditions/CreateTermsAndConditions'
import Footer from '../../component/footer/Footer'
import {NavLink} from 'react-router-dom'
function Admin() {

    const [openSellReport, setOpenSellReport] = useState(true)
    const [openMusicList, setOpenMusicList] = useState(true)
    const [openUploadMusic, setOpenUploadMusic] = useState(false)
    const [openSoldMusicHistory, setOpenSoldMusicHistory] = useState(false)
    const [openTopList, setOpenTopList] = useState(false)
    const [openRequestedMusic, setOpenRequestedMusic] = useState(false)
    const [opneCreateAds, setOpenCreateAds]=useState(false)
    const [opneCreateAboutUs,  setOpneCreateAboutUs] = useState(false)
    const [opneCreateContactUs, setOpneCreateContactUs] = useState(false)
    const [opneCreateLegal, setOpneCreateLegal] = useState(false)
    const [opneCreateTermsAndConditions, setOpneCreateTermsAndConditions] = useState(false)

    
    const handleOpenSellReport  = () =>{
        setOpenSellReport(true)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }

    const handleOpenMusicList  = () =>{
        setOpenSellReport(false)
        setOpenMusicList(true)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }
    const handleOpenMusicUpload  = () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(true)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }
    const handleOpenSoldMusicHistory  = () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(true)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }
    
    const handleOpenTopList= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(true)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }
    const handleOpenRequesteMusic= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(true)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }

    const handleOpenCreateAdds= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(true)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }

    // extra info
    const handleOpenCreateAboutUs= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(true)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }
    const handleOpenCreateContactUs= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(true)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(false)
    }
    const handleOpenCreateLegal= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(true)
        setOpneCreateTermsAndConditions(false)
    }
    const handleOpenCreateTermsAndConditions= () =>{
        setOpenSellReport(false)
        setOpenMusicList(false)
        setOpenUploadMusic(false)
        setOpenSoldMusicHistory(false)
        setOpenTopList(false)
        setOpenRequestedMusic(false)
        setOpenCreateAds(false)
        setOpneCreateAboutUs(false)
        setOpneCreateContactUs(false)
        setOpneCreateLegal(false)
        setOpneCreateTermsAndConditions(true)
    }

    return (
        <div>

            <div>
                <Navber />
            </div>
            <div class="sidebar">
            <a  onClick={handleOpenSellReport}>Sales Report</a>
        <a style={{padding:0}}><NavLink to="/musiclist">Music</NavLink></a>
        <a onClick={handleOpenMusicUpload}>Upload Music</a>
        <a  onClick={handleOpenTopList}>Top List</a>
        <a onClick={handleOpenRequesteMusic}>Requested Song</a>
        <a onClick={handleOpenCreateAdds}>Ads</a>
        <a onClick={handleOpenCreateAboutUs}>About</a>
        <a onClick={handleOpenCreateContactUs}>Contact</a>
        <a onClick={handleOpenCreateLegal}>Legal</a>
        <a onClick={handleOpenCreateTermsAndConditions}>Terms and conditions</a>
      </div>
      <div class="contents songUpdateDataCard" id="mainAdmindiv">

      {openUploadMusic && <UploadMusic />}
      {openTopList && <CreateTopList />}
      {openRequestedMusic && <RequestedMusic />}
      {openSellReport && <SellReport />}
      {opneCreateAds && <CreateAds />}
      {opneCreateAboutUs && <CreateAboutUs />}
      {opneCreateContactUs && <CreateContactUs />}
      {opneCreateLegal && <CreateLegal />}
      {opneCreateTermsAndConditions && <CreateTermsAndConditions />}
      </div>
        <br/>
        <br/>
        <br/>
      <Footer />
        </div>
    )
}

export default Admin
