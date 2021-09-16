import { TextField } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import SnackBer from '../../component/SnackBer'
import {useDispatch, useSelector} from 'react-redux'

function CreateAds() {
    const [ads, setAds]=useState()

    const [adds, setAdds] = useState({
        add1:'',
        add2:'',
    })
  
    const { accessToken} = useSelector(state => state.auth)
    const [successUpdate, setSuccessUpdate] = useState(false)
    const handeAdsInput = (e) => {
        setAdds(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    }

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

    
      useEffect( async () => {
        
        try {  
            await axios.get("http://127.0.0.1:8000/music/listofadd").then((res) => {
    
                setAds(res.data)
                // console.log(res.data);
            })
      
        } catch (err) {
          const error =  err.response ? err.response  : "networkError"
        }
    
    }, [])
    useEffect(() => {
        ads && setAdds({
            add1:ads.add1,
            add2:ads.add2,
        })
      
    }, [ads])

console.log(ads, adds);
    const UpdateAds = async (e) =>{
        e.preventDefault()
        const formData = new FormData()
        
        adds.add1 && formData.append('add1', adds.add1)
        adds.add2 && formData.append('add2', adds.add2)

        try {  
            await axios.post(`http://127.0.0.1:8000/music/updateads/`,formData, config).then((res) => {
                setSuccessUpdate(true)
                setAds(res.data)
            })
      
        } catch (err) {
          const error =  err.response ? err.response  : "networkError"
        }
    }

    const closeSuccessStatsu = () =>{
        setSuccessUpdate(false)
    }
    return (
        <div className="AdsPages">

            <h4>Ads For Newest Music</h4>
            <textarea value={adds.add1} onChange={e=>{handeAdsInput(e)}} name='add1' style={{width:'50%', height:200}} placeholder="create add1" />
            <h4>Ads For Top Music</h4>
            <textarea value={adds.add2}  onChange={e=>{handeAdsInput(e)}}  name='add2' style={{width:'50%', height:200}} placeholder="create add2" />
            <br/>
            <button style={{cursor:'pointer'}} onClick={UpdateAds}>Submit</button>
            
            {successUpdate && <SnackBer open="true" success_info="adds" closeSuccessStatsu={closeSuccessStatsu}/>}
        </div>
    )
}

export default CreateAds
