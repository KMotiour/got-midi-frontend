import React, {useEffect, useState} from 'react'
import Navber from '../../component/navber/Navber'
import './profilePage.css'
import '../../core.css'
import {useDispatch, useSelector} from 'react-redux'
import {changePassord} from '../../store/action/AuthAction'
import {getUserInfo, updateUserInfo} from '../../store/action/UserAction'
import {UPDATE_USER_INFO_SUCCESS_STATUS} from '../../store/action/ActionType'
import SnackBer from '../../component/SnackBer'
import Footer from '../../component/footer/Footer'

function Profile() {

    const [profilePicture, setProfilePicture] = useState(null);
    const [profileImgData, setProfileImgData] = useState(null);
    const [showProfile, setShowProfile] = useState(true)
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [viewDataName, setViewDataName] = useState('About')

    const dispatch = useDispatch()
    const {get_user_info_start, get_user_info_success, update_user_info_start,
        update_user_info_success, update_user_info_fail } = useSelector(state => state.user)
    
    const {accessToken, changePasswordStart, changePasswordSuccess, changePasswordFail} = useSelector(state => state.auth)
    const userInfo = get_user_info_success && get_user_info_success[0]
    console.log(changePasswordStart, changePasswordSuccess, changePasswordFail)

    const [UpdateUserInfos, setUpdateUserInfos] = useState({
        first_name:userInfo ? userInfo.first_name :'',
        last_name:userInfo ? userInfo.last_name :'',
    })

    const [changePassword, setChangePassword] = useState({
        current_password:'',
        new_password:'',
        re_new_password:''
    })
    
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

    useEffect(() => {
        {!get_user_info_success && dispatch(getUserInfo(config))}
       
    }, [])

    useEffect(()=>{
        if (update_user_info_success === true){
            setProfilePicture(null)
            setProfileImgData(null)
            setShowProfile(true)
            setShowEditProfile(false)


        } 
    },[update_user_info_success])

    // useEffect(()=>{
    //     if (changePasswordSuccess === true){
    //         setProfilePicture(null)
    //         setProfileImgData(null)
    //         setShowProfile(true)
    //         setShowEditProfile(false)
    //         setShowChangePassword(false)
    //     } 
    // },[changePasswordSuccess])



      
      const onChangeProfilePicture = e => {
       
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setProfileImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };
     
      const CancleProfilePicUpdate = () =>{
        setProfileImgData(null)
        setProfilePicture(null)
      }

      const HandleProfilePictureChange = (e) =>{
        e.preventDefault()
        let formData = new FormData()
        {profilePicture!==null && formData.append('profilePic', profilePicture )}
        dispatch(updateUserInfo(userInfo.id, formData, config))
      }

      const handleUpdateUserInfoInput = (e) =>{
        setUpdateUserInfos(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
          
      }


      const handleChangePasswrodInput = (e) =>{

        setChangePassword(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
          
      }


    //   Hande show changes

      const handleShowProfile = (e) =>{
        e.preventDefault()
        dispatch({type:UPDATE_USER_INFO_SUCCESS_STATUS})
        setChangePassword({
            current_password:'',
            new_password:'',
            re_new_password:''
        })

        setUpdateUserInfos({
            first_name:userInfo ? userInfo.first_name :'',
            last_name:userInfo ? userInfo.last_name :'',
        })
        setViewDataName('About')
        setShowProfile(true)
        setShowEditProfile(false)
        setShowChangePassword(false)
      }

      const handleShowEditProfile = (e) =>{
        e.preventDefault()
        setChangePassword({
            current_password:'',
            new_password:'',
            re_new_password:''
        })
        setViewDataName('Edit Profile')
        setShowProfile(false)
        setShowEditProfile(true)
        setShowChangePassword(false)
      }

      const handleShowChangePassword = (e) =>{
        e.preventDefault()
        setUpdateUserInfos({
            first_name:userInfo ? userInfo.first_name :'',
            last_name:userInfo ? userInfo.last_name :'',
        })

        setViewDataName('Change Password')
        setShowProfile(false)
        setShowEditProfile(false)
        setShowChangePassword(true)
      }


    const HandleUserInfoSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        console.log(UpdateUserInfos.first_name, UpdateUserInfos.last_name);
        formData.append('first_name', UpdateUserInfos.first_name)
        formData.append('last_name', UpdateUserInfos.last_name)
        dispatch(updateUserInfo(userInfo && userInfo.id, formData, config))
    }

    const handleChangePassword = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('current_password', changePassword.current_password)
        formData.append('new_password', changePassword.new_password)
        formData.append('re_new_password', changePassword.re_new_password)
        dispatch(changePassord(formData, config))
    }

console.log(showChangePassword);    
    return (
        <div>
            <div>
                <Navber />
            </div>

<div class="main">    
<div class="container emp-profile">
    <form>
        <div class="row">
            <div class="col-md-4">
            {profileImgData===null ? 

                <div class="profile-img">

                <img src= {userInfo && userInfo.profilePic && userInfo.profilePic} alt=""/>
                <div class="file btn btn-lg btn-primary">
                    Change Photo
                    <input onChange={onChangeProfilePicture} type="file" name="file"/>
                </div>
                </div>
               
            
            :
                <div class="profile-img">
                <img src={profileImgData} alt=""/><br />

                <button  onClick={HandleProfilePictureChange}>update profile</button> <button onClick={CancleProfilePicUpdate}>Cancel</button>
            
                </div>
}
            </div>
            <div class="col-md-6">
                <div class="profile-head">
                            <h5>
                              {userInfo && userInfo.first_name && userInfo.first_name} {userInfo && userInfo.last_name && userInfo.last_name}<br/>
                              {userInfo && userInfo.email}
                            </h5>
                            
    
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">{viewDataName}</a>
                        </li>
                      
                    </ul>
                </div>
                <div class="tab-content profile-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {showProfile && 
                                <div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{userInfo && userInfo.first_name} {userInfo && userInfo.last_name}</p>
                                         
                                    </div>

                                    
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    
                                    
                                    <div class="col-md-6"> 
                                        <p>{userInfo && userInfo.email && userInfo.email}</p>
                                    </div>
                                </div>
                                </div>
                                }

                                <div id="Edit_profileFrom">

                                    {showEditProfile && 
                                <div>
                                   
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>First Name</label>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group row updatefrom">
              <div class="col-sm-10">
                <input value={UpdateUserInfos.first_name} onChange={e=> {handleUpdateUserInfoInput(e)}} name="first_name" type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="First Name" />
                <span>{update_user_info_fail && update_user_info_fail.data.first_name}</span>
              </div>
            </div>
                                         
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Last Name</label>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group row updatefrom">
              <div class="col-sm-10">
                <input value={UpdateUserInfos.last_name} onChange={e=> {handleUpdateUserInfoInput(e)}}  name="last_name" type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Last Name"/>
                <span>{update_user_info_fail && update_user_info_fail.data.last_name}</span>
              </div>
            </div>
                                  
                                  
                                    </div>
                                </div>
                                <button class="btn proBtn" onClick={HandleUserInfoSubmit}>Submit</button> <button class="btn proBtn" onClick={handleShowProfile}>Cancel</button>
                                </div>
                                }
                                
                                {showChangePassword && 
                                <div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <label>current_password</label>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group row updatefrom">
              <div class="col-sm-10">
                <input name="current_password" onChange={e=> handleChangePasswrodInput(e)} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="confirm password"/>
              </div>
            </div>


                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <label>password</label>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group row updatefrom">
              <div class="col-sm-10">
                <input name="new_password" onChange={e=> handleChangePasswrodInput(e)} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="password" />
              </div>
            </div>
                                         
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>confirm password</label>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group row updatefrom">
              <div class="col-sm-10">
                <input name="re_new_password" onChange={e=> handleChangePasswrodInput(e)} type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="confirm password"/>
              </div>
            </div>
           
                                    </div>
                                </div>
                                <button class="btn proBtn" onClick={handleChangePassword}>Submit</button> <button class="btn proBtn" onClick={handleShowProfile}>Cancel</button>
                                </div>
                                }
                            


                        </div>

                    </div>
                    
                </div>
            </div> 
            <div class="col-md-2">
                <input style={{margin:5}} onClick={handleShowEditProfile} type="submit" class="profile-edit-btn proBtn" name="btnAddMore" value="Edit Profile"/>
                <input style={{margin:5}} onClick={handleShowChangePassword} type="submit" class="profile-edit-btn proBtn" name="btnAddMore" value="Change Password"/>
            </div>
           
        </div>
       
    </form>           
</div>
<Footer />
       </div>

       {update_user_info_success && <SnackBer open={true} success_info="userInfo Updated" />}
       {changePasswordSuccess  && <SnackBer open={true} success_info="password change success" />}
       {changePasswordFail  && <SnackBer open={true} success_info="False" changePasswordFail={changePasswordFail.data} />}
            
        </div>
    )
}

export default Profile
