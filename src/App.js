import React, {useEffect} from 'react'
import Cart  from './container/cart/Cart'
import HomePage from './container/HomePage'
import TopSong from './container/TopSong'
import LatestSong from './container/LatestSong'
import EmailVarification from './container/EmailVarification'
import ResetPasswordConfirm from './container/ResetPasswordConfirm'
import DownlaodMusic from './container/DownlaodMusic'
import Profile from './container/profile/Profile'
import UpdateMusic from './container/updateMusic/UpdateMusic'
import SearchSong from './container/searchSong/SearchSong'
import {BrowserRouter as Router, Switch, Route, Link,  } from "react-router-dom";
import './core.css'
import UploadMusic from './container/uploadMusic.js/UploadMusic'
import CreateAdd from './container/createAdd/CreateAdd'
import {useDispatch, useSelector} from 'react-redux'
import  {getUserInfo}  from './store/action/UserAction'
import Admin from './container/admin.js/Admin'
import {AuthenticRoute, IsAdminRoute, LogedInRoute} from './PrivateRoute'
import SellReport from './container/sellReport/SellReport'
import SingleSongView from './container/singleSonView/SingleSongView'
import ContruchUs from './component/contructUs/contruchUs'
import AboutUs from './component/AboutUs/AboutUs'
import Legal from './component/legal/Legal'
import TermsAndCondition from './component/termsAndCondition/TermsAndCondition'
import CreateAboutUs from './container/createAboutUs/CreateAboutUs'
import CreateContactUs from './container/createContactUs/CreateContactUs'
import CreateLegal from './container/createLegal/CreateLegal'
import CreateTermsAndConditions from './container/createTermsAndConditions/CreateTermsAndConditions'
import MusicList from './container/MusicList'
import PageNotFound from './component/PageNotFound'


function App() {
  const dispatch = useDispatch()
  const {accessToken} = useSelector(state => state.auth)

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('access_token'),
    },
  }

  useEffect(() => {

    dispatch(getUserInfo(config))
   
  }, [])

  


  return (
    <div className="App">
          <Router>
              <switch> 
                <Route exact path="/createabout" component={CreateTermsAndConditions} />
                <Route exact path="/song/:songetitle/:id" component={SingleSongView} />
                <Route exact path="/sellreport" component={SellReport} />
                <Route exact path="/add" component={CreateAdd} />
                <IsAdminRoute exact path='/admin' component={Admin} /> 
                <IsAdminRoute exact path='/musiclist' component={MusicList} /> 
                <IsAdminRoute exact path='/updatemusic/:songId' component={UpdateMusic} /> 
                <AuthenticRoute exact path='/profile' component={Profile} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/topsong' component={TopSong} />
                <Route exact path='/latestsong' component={LatestSong} />
                <AuthenticRoute exact path='/downlaodmusic' component={DownlaodMusic} />
                <Route exact path='/activate/:uid/:token' component={EmailVarification} />
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/search/:song' component={SearchSong} />

                <Route exact path='/contactus' component={ContruchUs} />
                <Route exact path='/about' component={AboutUs} />
                <Route exact path='/legal' component={Legal} />
                <Route exact path='/termsandcondition' component={TermsAndCondition} />
                <Route exact path='/' component={HomePage} />
                <Route  component={PageNotFound} />
                
              </switch>
          </Router>
         
    </div>
  );
}

export default App;
