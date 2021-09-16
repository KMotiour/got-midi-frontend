import React from 'react'
import { useHistory, NavLink, useParams } from "react-router-dom";
import { Button, Radio } from 'antd';
import Navber from '../component/navber/Navber'
import {UserActivation} from '../store/action/AuthAction'
import {useDispatch, useSelector} from 'react-redux'
import { Spin } from 'antd';
function EmailVarification() {

    const dispatch = useDispatch()
    const {uid, token} = useParams()
    const {startEmailVarification, emailVarificationSuccess, emailVarificationFail} = useSelector(state => state.auth)
    // console.log(startEmailVarification, emailVarificationSuccess, emailVarificationFail && emailVarificationFail);
    
    const loghandleActivation = () =>{
     
        const formData = new FormData()
        formData.append('uid', uid)
        formData.append('token', token)
        dispatch(UserActivation(formData))
    }


    return (
        <div style={{marginTop:'10%'}}>
            <div>
                <Navber />
            </div>

            <div className="main">
                
                {emailVarificationFail &&  emailVarificationFail.data ? <span style={{color:'red', fontSize:25}}> { emailVarificationFail.data.uid ?
                emailVarificationFail.data.uid : emailVarificationFail.data.token ? emailVarificationFail.data.token : emailVarificationFail.data.detail} </span>
                :
                <div>
                <h1>Press the verify button to active you'r account</h1>
                {startEmailVarification ? <Spin style={{ marginTop: 5 }} size="large" />:
                <Button onClick={loghandleActivation} type="primary" shape="round" style={{width:200}} size="large">
                Verify
                </Button>
                         }

                </div>
                }   
            </div>
        </div>
    )
}

export default EmailVarification
