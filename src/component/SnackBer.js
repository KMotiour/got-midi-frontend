import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter, NavLink } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {UPDATE_MUSIC_TO_CART_SUCCESS_STATUS, UPDATE_SINGLE_SONG_SUCCESS_STATUS, UPDATE_TOP_LIST_SUCCESS_STATUS,
  UPDATE_DELETE_REQUESTED_MUSIC_LIST_SUCCESS, UPDATE_USER_INFO_SUCCESS_STATUS, UPDATE_CHANGE_PASSWORD_SUCCESS_STATUS,
  UPDATE_CREATE_EXTRA_INFO_SUCCESS_STATIS} from '../store/action/ActionType'



function  SnackBer(props) {


    const dispatch = useDispatch()
    const history = useHistory()
    const [state, setState] = React.useState({
        snackBerOpen: false,
        vertical: 'top',
        horizontal: 'center',
      });

      const info = props.success_info
      const {horizontal, vertical, snackBerOpen} = state;

      const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer "+localStorage.getItem('access_token')
      }}

      
      useEffect(()=>{
          setState({...state, snackBerOpen:props.open})
      },[])


      let confirmInfo = 'added to cart successfully'
      if (props.success_info=='purched allready'){

        confirmInfo='This music is already purchased!'
        closeDialog('upa')

      }
      if (props.success_info=='already added to cart'){

        confirmInfo='Already added to cart'
        closeDialog('uaa')
        
      }
      if (props.success_info=='update successfully'){

        confirmInfo='Successfully Updated'
        closeDialog('sfu')
      }
      if (props.success_info=='top list update'){

        confirmInfo='Successfully Updated'
        closeDialog('tlu')
      } if (props.success_info=='delete requested list'){

        confirmInfo='Successfully deleted'
        closeDialog('drl')
      }if (props.success_info=='added toplist'){

        confirmInfo='Added To top list'
        closeDialog('tlu')
      }if (props.success_info=='userInfo Updated'){

        confirmInfo='Updated SuccessFully'
        closeDialog('uiu')
      }if (props.success_info=='password change success'){

        confirmInfo='Successfully changed Password.'
        closeDialog('pcs')
      }
      if (props.success_info=='False'){

        if (props.changePasswordFail.current_password){
          confirmInfo='current_password: Invalid current password'
        }
        else if (props.changePasswordFail.new_password){
          confirmInfo='new_password:'+props.changePasswordFail.new_password
        }
        else if (props.changePasswordFail.non_field_errors){
          confirmInfo='Error:'+props.changePasswordFail.non_field_errors
        }
       
        closeDialog('ucps')
      }
      if (props.success_info=='adds'){

        confirmInfo="Successfully Updated"
        closeDialog('su')
      }if (props.success_info=='aboutus updated'){

        confirmInfo="Successfully Updated"
        closeDialog('au')
      }


      
      // password change error
      
      async function closeDialog (dis){
        await new Promise((resolve) => setTimeout(() => { 
            setState({ ...state, snackBerOpen: false });  

            // profile
            dis === 'upa' && dispatch({
              type:UPDATE_MUSIC_TO_CART_SUCCESS_STATUS
              
            })
            dis === 'uaa' && dispatch({
                type:UPDATE_MUSIC_TO_CART_SUCCESS_STATUS
                
              })
            
              dis === 'sfu' && dispatch({
                type:UPDATE_SINGLE_SONG_SUCCESS_STATUS
                
              })
              dis === 'tlu' && dispatch({
                type:UPDATE_TOP_LIST_SUCCESS_STATUS
                
              })
              dis === 'drl' && dispatch({
                type:UPDATE_DELETE_REQUESTED_MUSIC_LIST_SUCCESS
                
              })
              dis === 'uiu' && dispatch({
                type:UPDATE_USER_INFO_SUCCESS_STATUS
                
              })
              dis === 'pcs' && dispatch({
                type:UPDATE_CHANGE_PASSWORD_SUCCESS_STATUS
                
              })
              dis === 'ucps' && dispatch({
                type:UPDATE_CHANGE_PASSWORD_SUCCESS_STATUS
                
              })
              dis === 'su' && props.closeSuccessStatsu(false)
              
              dis === 'au' && dispatch({
                type:UPDATE_CREATE_EXTRA_INFO_SUCCESS_STATIS
                
              })
     

            
        
        }, 3000))
      }

    
    
    return (
        <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={true}
                    key={vertical + horizontal}>
                      
                      <SnackbarContent
                        aria-describedby="message-id2"
                        style={props.success_info === 'False' ? {backgroundColor:'red'}: {backgroundColor:'rgb(28, 173, 254)'}}
                        message={
                          <span id="message-id2">
                            <div>{confirmInfo}</div>
                          </span>
                      }
                      />
                    </Snackbar>
                
        </div>
    )
}

export default SnackBer