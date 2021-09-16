import React, {useState, useEffect} from 'react'
import '../../core.css'
import Login from '../../container/Login'
import Registration from '../../container/Registration'
import {useHistory, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {AUTH_LOGOUT} from '../../store/action/ActionType'
import {CountCartedMusic} from '../../store/action/MsuicAction'
import {getUserInfo} from '../../store/action/UserAction'
// import {midlogo} from '../../../public/midlogo.png'
import logo from '../../img/midlogo.png';


function Navber() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {authStart, accessToken, authFail, is_superUser} = useSelector(state => state.auth)
    const {getAddToCartCoutSuccess} = useSelector(state => state.music)
    const {get_user_info_start, get_user_info_success, update_user_info_success} = useSelector(state => state.user)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegistration, setOpenRegistration] = useState(false)
    const [searchText, setsearchText] = useState('')
    console.log(is_superUser);
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

    useEffect(() => {
       {!getAddToCartCoutSuccess && accessToken && dispatch(CountCartedMusic(config))}
        
    }, [])

    useEffect(() => {
        accessToken && get_user_info_success && get_user_info_success.is_superuser!==true && dispatch(CountCartedMusic(config))
         
     }, [])



    const handleOpenLogin = () =>{
        setOpenLogin(true)
        setOpenRegistration(false)
    }
    

    const handleOpenRegistration = () =>{
        setOpenLogin(false)
        setOpenRegistration(true)
    }
  

    const handleLogout  = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('is_superuser')
        dispatch({
            type:AUTH_LOGOUT
        })
        
        goToHome()
    }
    async function goToHome() {
        await new Promise((resolve) => setTimeout(() => {
          const access_token = localStorage.getItem('access_token')
          if (!access_token) {
            history.push('/')
          }
    
        },1000))
      }

      const superuser = get_user_info_success && get_user_info_success[0].is_superuser 
      console.log(superuser==null && 'helo');
      const handelSearch = (e) =>{
          e.preventDefault()
          console.log(searchText);

          searchText && history.push('/search/'+searchText)

      }
    return (
        <div>
            {openLogin && <Login  open={true} setOpenLogin={setOpenLogin}/>}
            {openRegistration && <Registration open={true} setOpenRegistration={setOpenRegistration}/>}

            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="logoDiv" >
                    <NavLink to="/" className="navbar-brand"><img src={logo} alt="Logo" id="gotmidiLogo"/><br /><span className="logo_discription">licensed piano.mid files</span></NavLink>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div id="navS_from">
                        <form className="form-inline" onSubmit={handelSearch} >

                            <div className="form-group has-search" id="Search_barbox">
                                <span className="fa fa-search form-control-feedback"></span>
                                <input value={searchText} onChange={e =>{setsearchText(e.target.value)}}  type="text" className="form-control" placeholder="Search songs artists and albums" id="searchbar" />
                                <button onSubmit={handelSearch} onClick={handelSearch} className="btn my-sm-0" type="submit" style={{ backgroundColor: "rgba(28,173,254,255)", color: "white" }}>Search</button>
                            </div>
                        </form>
                    </div>
                    <div id="pagelink">

                        {accessToken ? 

                        is_superUser==="true" ? 
                        
                        <ul className="navbar-nav mr-auto">
                            
                        <li className="nav-item" >
                        <NavLink to="/admin" className="nav-link">Admin </NavLink> 
                        </li>
                        <li className="nav-item" >
                        <NavLink to="/profile" className="nav-link">Profile </NavLink> 
                           
                        </li>

                        <li className="nav-item" onClick={handleLogout}>
                            <a className="nav-link" >Logout</a>
                        </li>
                        </ul>
                            
                        :

                       
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <NavLink to="/cart" className="nav-link">Cart <span style={{color:'red'}}>{getAddToCartCoutSuccess && getAddToCartCoutSuccess}</span> </NavLink> 
                        </li>
                        <li className="nav-item" >
                        <NavLink to="/downlaodmusic" className="nav-link">Download </NavLink> 
                        </li>
                        <li className="nav-item" >
                        <NavLink to="/profile" className="nav-link">Profile </NavLink> 
                           
                        </li>

                        <li className="nav-item" onClick={handleLogout}>
                            <a className="nav-link" >Logout</a>
                        </li>
                       
                    </ul>
                        
                        :
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <NavLink to="/cart" className="nav-link">Cart </NavLink>
                            </li>
                        
                            <li className="nav-item" onClick={handleOpenLogin}>
                                <a className="nav-link" >Login</a>
                            </li>
                            <li clclassNameass="nav-item">
                                <a className="nav-link" onClick={handleOpenRegistration}>Register</a>
                            </li>
                           
                        </ul>
                    }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navber
