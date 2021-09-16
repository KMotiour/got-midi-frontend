import React, { useState, useEffect } from 'react'
import Navber from '../../component/navber/Navber'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { CartItems , purchMusic, RemoveMusicFromCart, CountCartedMusic} from '../../store/action/MsuicAction'
import Footer from '../../component/footer/Footer'
import {useHistory} from 'react-router-dom'
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


function Cart() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { getAddToCartItemSuccess, purchMusicSuccess } = useSelector(state => state.music)
    const {authStart, accessToken, authFail} = useSelector(state => state.auth)
    const [showPaypal, setShowPaypal] = useState(false)
    const [songId, setSongId] = useState([])

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };


    useEffect(() => {

        accessToken && dispatch(CartItems(config))

    }, [])


    const PurchaseMusic = () =>{

        setShowPaypal(!showPaypal)
        

    }

    const RemoveItemFormCart = (id) =>{
       
        dispatch(RemoveMusicFromCart(id, config))
    }
    const price = 0
    const createOrder = (data, actions) => {

        return actions.order.create({
    
          purchase_units: [
    
            {
    
              amount: {
    
                value: getAddToCartItemSuccess && getAddToCartItemSuccess[0].totalPrice && getAddToCartItemSuccess && getAddToCartItemSuccess[0].totalPrice
    
              },
    
            },
    
          ],
    
        });
    
      }
    
    
    const  onApprove = (data, actions) =>{
        dispatch(purchMusic(config))
        history.push('/downlaodmusic')
        return actions.order.capture();
        
    
    }


    return (
        <div>
            <div>
                <Navber />
            </div>
            <div class="main">
                <div className="asideM_div">
                <div class="cardPages_prices">
                    <div class="songnavbar sticky">
                        <div>
                            <br/>
                            <h5 class="Price_title">Cart</h5>
                        </div>
                        {/* <div>
                            <h5 class="Price_title">Song Prices</h5>
                        </div> */}
                    </div>
                {getAddToCartItemSuccess && getAddToCartItemSuccess[0].music.map((music, index) =>(

                    <div key={index} class="single_songDetelsss" id="cartPageBorder">
                        <ul class="flex-container" id="Cardpageflexcontainer">
                            <li class="flex-item flex1">
                                <div class="videoimg">
                                    <img src={music.artWork} alt="" width="8rem" />
                                    <div class="overlay">
                                        <a  class="icon" title="Play">
                                            <i class="fas fa-play"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="flex-item flex2" id="card_P_prics"><h6>{music.artist}</h6>
                                <p>{music.title}</p>

                            </li>

                            <li class="flex-item flex3">
                                <button onClick={e =>{RemoveItemFormCart(music.id)}} type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="S_price" id="S_price"> ${music.price} </h5>
                            </li>
                        </ul>
                    </div>
                     ))}


                    <hr />

                    <div style={{float:'right', display:'flex', flexDirection:'column'}}id="paymentproDiv">

                        <p class="totall_prices">Totall Amaount: <span style={{ marginLeft: "1rem" }}>${getAddToCartItemSuccess && getAddToCartItemSuccess[0].totalPrice}</span></p>
                       
                    
                        <button onClick={PurchaseMusic} class="btn" id="purchasebtn">Continue To Purchase</button>

                        <div  style={{marginTop:15}} id="paypalbtn">
                            {showPaypal && (
                                <PayPalButton
                             
                                    createOrder={(data, actions) => createOrder(data, actions)}
                                    onApprove={(data, actions) => onApprove(data, actions)}
                               />

                            )}
                           
                        </div>

                    </div>

                    
                </div>
                <div className="aside_add">
        <h4>Piano Midi songs for SYNTHESIA </h4>
        <p>
        Buying expensive Midi files is now a thing of the past. Our midi service is affordable and a growing new database of Midi files in piano format.
            </p>
            <p>
            All of our midi songs can be used in Synthesia! All our midi songs can converted to sheet music using a free download app www.musescore.org
                    </p>
         </div>
         </div>
         <br />
         <br />
         <br />


        <Footer />
            </div>


        </div>
    )
}

export default Cart
