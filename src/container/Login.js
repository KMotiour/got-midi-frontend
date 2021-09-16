import React, { useState } from 'react';
import { Modal} from 'antd';

import 'antd/dist/antd.css';
import '.././LoginRpage/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, RequestResetPassword } from '../store/action/AuthAction'
import { UPDATE_AUTH_STATUS, UPDATE_FORGET_PASSWORD_REQUEST_STATUS } from '../store/action/ActionType'
import { Spin } from 'antd';



const Login = ({ open, setOpenLogin }) => {

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(open);
  const [forgetPassowrdVisible, setForgetPassowrdVisible] = useState(false)
  const [hidePassword, setHidePassword] = useState('password')


  const { authStart, accessToken, authFail, startForgetPasswordRequest, forgetPasswordRequestSuccess, forgetPasswordRequestFail } = useSelector(state => state.auth)
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState('')


  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const { email, password } = loginInfo

  const handleShowPassword = () =>{
    if (hidePassword === 'password'){
      setHidePassword('text')
    }else{
      setHidePassword('password')
    }


  }
  const hangleOnClancel = () => {
    setVisible(false)
    setOpenLogin(false)
    dispatch({ type: UPDATE_AUTH_STATUS })
    dispatch({type:UPDATE_FORGET_PASSWORD_REQUEST_STATUS})
  }

  const handleInput = (e) => {
    setLoginInfo(perState => ({
      ...perState,
      [e.target.name]: e.target.value

    }))
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    dispatch(login(formData))
  }

  const handleForgetPasswordRequestSubmit = (e) => {
    e.preventDefault()
  
    dispatch(RequestResetPassword(forgetPasswordEmail))
  }


  { accessToken && goToHome() }
  async function goToHome() {
    await new Promise((resolve) => setTimeout(() => {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        setVisible(false)
        setOpenLogin(false)
        dispatch({ type: UPDATE_AUTH_STATUS })
        dispatch({type:UPDATE_FORGET_PASSWORD_REQUEST_STATUS})
      }

    }))
  }

  return (
    <>

      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={hangleOnClancel}
        width={'auto'}
        footer={[
        ]}
      >
        <div class="content" style={{ borderRightColor: 'gray' }}>
          
          {forgetPassowrdVisible ?  
          forgetPasswordRequestSuccess ? 
          <div style={{marginTop:20, color:'#007bff'}}>
            Please check you'r email for reset password

          </div>
          
          : 
          
          <div>
            <h4 style={{ textAlign: "center", fontSize:25, paddingTop: "1.5rem" }}>enter you'r email</h4>
            <form class="login" onSubmit={handleForgetPasswordRequestSubmit}>

              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input value={forgetPasswordEmail} onChange={e => setForgetPasswordEmail(e.target.value)} type="email" name="email" class="login__input" placeholder="Email" id="email" required /><br />
                <span style={{ color: 'red', fontSize: 11, float: 'left' }}>{forgetPasswordRequestFail && forgetPasswordRequestFail.data && forgetPasswordRequestFail.data.email && forgetPasswordRequestFail.data.email}</span>
              </div>
  
              <div>
                {startForgetPasswordRequest ? <Spin style={{ marginTop: 5 }} size="large" /> :
                  <button onClick={handleForgetPasswordRequestSubmit} class="button login__submit" type="submit" id="login">
                    <span class="button__text">Submit</span>

                  </button>
                }
                <span onClick={e => { setForgetPassowrdVisible(false) }} style={{
                  color: 'gray',
                  float: 'right', cursor: 'pointer'
                }}>Backt To Login?</span>
              </div>

            </form>
            <br />
          </div>
          

            :

            <div>
              <h4 style={{ textAlign: "center", paddingTop: "1.5rem" }}>Login</h4>
              <form class="login" onSubmit={handleSubmit}>

                <div class="login__field">
                  <i class="login__icon fas fa-user fa_log"></i>
                  <input onChange={handleInput} value={email} type="email" name="email" class="login__input" placeholder="Email" id="email" required /><br />
                  <span style={{ color: 'red', fontSize: 11, float: 'left' }}>{authFail && authFail.data && authFail.data.email && authFail.data.email}</span>
                </div>
                <div class="login__field">
                  <i class="login__icon fas fa-lock"></i>
                  <input onChange={handleInput} value={password} type={hidePassword} name="password" class="login__input" placeholder="Password" id="password" required />
                  <i onClick={handleShowPassword} style={{cursor:'pointer'}} class="login__icon far fa-eye" id="togglePassword" data-toggle="tooltip"
                    title="show password"></i><br />
                  <span style={{ color: 'red', fontSize: 11, float: 'left' }}>{authFail && authFail.data && authFail.data.detail}</span>
                  <span style={{ color: 'red', fontSize: 11, float: 'left' }}>{authFail && authFail.data && authFail.data.password && authFail.data.password}</span>
                </div>

                <br />

                <div>
                  {authStart ? <Spin style={{ marginTop: 5 }} size="large" /> :
                    <button onClick={handleSubmit} class="button login__submit" type="submit" id="login">
                      <span class="button__text">Log In</span>

                    </button>
                  }
                  <span onClick={e => { setForgetPassowrdVisible(true) }} style={{
                    color: 'gray',
                    float: 'right', cursor: 'pointer'
                  }}>Forget Password?</span>
                </div>

              </form>
              <br />
            </div>
          }
        </div>
      </Modal>
    </>
  );
};

export default Login