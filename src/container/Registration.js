import React, { useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import '.././LoginRpage/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { Registration } from '../store/action/AuthAction'
import { UPDATE_REGISTRATION_STATUS } from '../store/action/ActionType'
import { Spin } from 'antd';

const Registraion = ({ open, setOpenRegistration }) => {

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(open);
  const [hidePassword1, setHidePassword1] = useState('password')
  const [hidePassword2, setHidePassword2] = useState('password')
  const { registrationStart, registrationSuccessStatus, registrationFail } = useSelector(state => state.auth)

  const [registrationInfo, setRegistrationInfo] = useState({
    email: '',
    password: '',
    re_password: ''
  })

  const handleShowPassword1 = () =>{
    if (hidePassword1 === 'password'){
      setHidePassword1('text')
    }else{
      setHidePassword1('password')
    }


  }
  const handleShowPassword2 = () =>{
    if (hidePassword2 === 'password'){
      setHidePassword2('text')
    }else{
      setHidePassword2('password')
    }
  }

  const hangleOnClancel = () => {
    setVisible(false)
    setOpenRegistration(false)
    dispatch({
      type: UPDATE_REGISTRATION_STATUS
    })
  }

  const handleInput = (e) => {
    setRegistrationInfo(perState => ({
      ...perState,
      [e.target.name]: e.target.value

    }))
  }

  const { email, password, re_password } = registrationInfo

  const handleSubmint = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('re_password', re_password)
    dispatch(Registration(formData))
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
        {registrationSuccessStatus ?
          <div style={{padding:50}}>
            <p style={{ fontSize: 15, marginTop: 20 }}>An account has been created for this email: "{registrationSuccessStatus.email}"</p>
          </div>

          :
          <div class="content">
            <h4 style={{ textAlign: "center", paddingTop: "1.5rem" }}>Register</h4>
            <form class="login" onSubmit={handleSubmint}>

              <div class="login__field">
                <i class="login__icon fas  fa-envelope"></i>
                <input name="email" value={email} onChange={handleInput} type="email" class="login__input" placeholder="Email" id="email" />
                <span style={{ color: 'red', float: 'left' }}>{registrationFail && registrationFail.data && registrationFail.data.email}</span>

              </div> <br />
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input name="password" value={password} onChange={handleInput} type={hidePassword1}class="login__input" placeholder="Password" id="password" />
                <span style={{ color: 'red', float: 'left' }}>{registrationFail && registrationFail.data && registrationFail.data.password}</span>
                <i style={{cursor:'pointer'}} onClick={handleShowPassword1} class="login__icon far fa-eye" id="togglePassword" data-toggle="tooltip"
                  title="show password"></i>

              </div><br />
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input name="re_password" value={re_password} onChange={handleInput} type={hidePassword2} class="login__input" placeholder="Confirm Password" id="password" />
                <span style={{ color: 'red', float: 'left' }}>{registrationFail && registrationFail.data && registrationFail.data.non_field_errors}</span>

                <i style={{cursor:'pointer'}} onClick={handleShowPassword2} class="login__icon far fa-eye" id="togglePassword" data-toggle="tooltip"
                  title="show password"></i>

              </div>
              <p id="msg" style={{ textAlign: "left", fontSize: 12, padding: 0, margin: 0, marginLeft: 13 }}></p>
              <div>
                {registrationStart ? <Spin style={{ marginTop: 5 }} size="large" /> :
                  <button onClick={handleSubmint} class="button login__submit" type="button" onclick="email_verification()" id="login">
                    <span class="button__text">Register</span>
                    {/* <!-- <i class="button__icon fas fa-chevron-right"></i> --> */}
                  </button>
                }
              </div>

            </form>


          </div>}
      </Modal>
    </>
  );
};

export default Registraion