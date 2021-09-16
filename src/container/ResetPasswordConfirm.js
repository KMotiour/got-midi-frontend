import React, {useState} from 'react'
import Navber from '../component/navber/Navber'
import {ResetPasswordConfirms} from '../store/action/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink, useParams } from "react-router-dom";
import { Spin, Space } from 'antd';

function ResetPasswordConfirm() {

    const dispatch = useDispatch()
    const {uid, token} = useParams()

    const {startForgetPassword, forgetPasswordSuccess, forgetPasswordFail} = useSelector(state => state.auth)
    const [restPasswordInfo, setRestPasswordInfo] = useState({
        password:'',
        re_password:''
    })

    const {password, re_password} = restPasswordInfo

    const handleInput = (e) =>{

        setRestPasswordInfo(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    }

    const handleSubmint = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('uid', uid)
        formData.append('token', token)
        formData.append('new_password', password)
        formData.append('re_new_password', re_password)
        dispatch(ResetPasswordConfirms(formData))

    }

    return (
        <div>
            <div>
                <Navber />
            </div>
            <div className="main">
            <div class="content">

                {forgetPasswordSuccess ?  <h4 style={{textAlign: "center", paddingTop: "1.5rem"}}>Reset Password Successfull</h4> :
               <h4 style={{textAlign: "center", paddingTop: "1.5rem"}}>Reset Password</h4>
            }
             {forgetPasswordSuccess ? 
             <div>
                 <h5 style={{color:'#007bff'}}>Password Reset Successfull, try to login again </h5>

             </div>
             
             : 
                <form style={{margin:'auto'}} className="login" onSubmit={handleSubmint} >
                 
    
                    <div className="login__field">
                        <i className="login__icon fas fa-lock"></i>
                        <input name="password" value={password} onChange={handleInput}  className="login__input" placeholder="New Password" id="password" />
                        <span style={{color:'red', float:'left'}}>{forgetPasswordFail && forgetPasswordFail.data && forgetPasswordFail.data.new_password}</span>
                       
        
                    </div><br/>
                    <div className="login__field">
                      <i className="login__icon fas fa-lock"></i>
                      <input name="re_password" value={re_password} onChange={handleInput}   className="login__input" placeholder="Confirm New Password" id="password" />
                      <span style={{color:'red', float:'left'}}>{forgetPasswordFail && forgetPasswordFail.data && forgetPasswordFail.data.non_field_errors}</span>
                      <span style={{color:'red', float:'left'}}>{forgetPasswordFail && forgetPasswordFail.data && forgetPasswordFail.data.token}</span>
                      <span style={{color:'red', float:'left'}}>{forgetPasswordFail && forgetPasswordFail.data && forgetPasswordFail.data.uid}</span>
                      
      
                  </div>
                    <p id="msg" style={{textAlign: "left", fontSize: 12, padding: 0, margin: 0,  marginLeft: 13}}></p>
                    <div>
                      {startForgetPassword ? <Spin style={{marginTop:5}} size="large" /> :
                        <button  onClick={handleSubmint} class="button login__submit" type="button" onclick="email_verification()" id="login">
                            <span class="button__text">Register</span>
                         
                        </button>
                         }
                       
                    </div>
        
                </form>}
  

            </div>
            </div>
        </div>
    )
}

export default ResetPasswordConfirm
