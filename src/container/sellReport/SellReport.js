import React,  { useState, useEffect } from 'react'
import './sellReport.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import {getSellsReport, getSellsReportWithGiveDate} from '../../store/action/AdminAction'
import moment from "moment";



const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  


function SellReport() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const { authStart, accessToken, authFail } = useSelector(state => state.auth)
    const { getSellReportStart, getSellReportSuccess, getSellReportFail, getSellReportWithDateStart,
        getSellReportWithDateSuccess, getSellReportWithDateFail } = useSelector(state => state.admin)

    // console.log(getSellReportStart, getSellReportSuccess, getSellReportFail, getSellReportWithDateStart,
    //     getSellReportWithDateSuccess, getSellReportWithDateFail);

    console.log(getSellReportWithDateSuccess && getSellReportWithDateSuccess);

    const config = {
        headers: {
            "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
        },
    };

    const handleTime = (e) =>{
        console.log(e.target.value);
    }
  

    useEffect(() => {
      dispatch(getSellsReport(config))

    }, [])

    const getRportWithGiveDate = ()=>{
        const formData = new FormData()
        if(startDate && endDate){
            console.log(startDate, endDate, 'dates');
            formData.append('startDate', startDate)
            formData.append('endDate', endDate)
            dispatch(getSellsReportWithGiveDate(formData, config))
        }else if(startDate && !endDate){
            console.log(startDate, endDate,'date');
            formData.append('startDate', startDate)
            formData.append('endDate', 'no')
            dispatch(getSellsReportWithGiveDate(formData, config))
        }
        else if(!startDate && endDate){
            console.log(startDate, endDate,'da');
            formData.append('startDate', 'no')
            formData.append('endDate', endDate)
            dispatch(getSellsReportWithGiveDate(formData, config))
        }else{
            console.log(startDate, endDate, 'datess');
            formData.append('startDate', 'no')
            formData.append('endDate', 'no')
            dispatch(getSellsReportWithGiveDate(formData, config))
        }

      
    }





    return (
        <div>
            <div class="content" id="mainAdmindiv">
       
       <div class="home-content">
         <div class="overview-boxes">
           <div class="box">
             <div class="right-side">
               <div class="box-topic">Total Sales</div>
               <div class="number">{getSellReportSuccess && getSellReportSuccess.numberOfSelllast24Hays}</div>
               <div class="indicator">
                 {/* <!-- <i class='bx bx-up-arrow-alt'></i> --> */}
                 <span class="text">Last-24 hours</span>
               </div>
             </div>
             <i class='bx bxs-cart-add cart two' ></i>
           </div>
           <div class="box">
             <div class="right-side">
               <div class="box-topic">Total Earn</div>
               <div class="number">${getSellReportSuccess && getSellReportSuccess.revenueOnLast24HSell.music__price__sum}</div>
               <div class="indicator">
                 {/* <!-- <i class='bx bx-up-arrow-alt'></i> --> */}
                 <span class="text">Last-24 hours</span>
               </div>
             </div>
             {/* <!-- <i class='bx bxs-cart-add cart two' ></i> --> */}
             <i class='bx bx-dollar-circle cart '></i> 
                  </div>
           <div class="box">
             <div class="right-side">
               <div class="box-topic">Total Sales</div>
               <div class="number">{getSellReportSuccess && getSellReportSuccess.numberOfSelllast30Days}</div>
               <div class="indicator">
                 {/* <!-- <i class='bx bx-up-arrow-alt'></i> --> */}
                 <span class="text">Last-month</span>
               </div>
             </div>
             <i class='bx bxs-cart-add cart two' ></i>
           </div>
           <div class="box">
             <div class="right-side">
               <div class="box-topic">Total Earn</div>
               <div class="number">${getSellReportSuccess && getSellReportSuccess.revenueOnLast30DSell.music__price__sum}</div>
               <div class="indicator">
                 {/* <!-- <i class='bx bx-down-arrow-alt down'></i> --> */}
                 <span class="text">Last-month</span>
               </div>
             </div>
             {/* <!-- <i class='bx bxs-cart-download cart four' ></i> --> */}
             <i class='bx bx-dollar-circle cart '></i> 
   
           </div>
         </div>
   
         <div class="sales-boxes">
           <div class="recent-sales box">
             <div class="title">Select date</div>
             <div class="sales-details">
               <div class="calendar">
                 

                 <form className={classes.container} noValidate id="celender_alinement">

      <TextField
        onChange={e =>{setStartDate(e.target.value)}}
        id="date"
        label="Start Date"
        type="date"
        defaultValue={moment().format("YYYY-MM-DD")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

       <TextField
        onChange={e =>{setEndDate(e.target.value)}}
        id="date"
        label="End Date"
        type="date"
        defaultValue={moment().format("YYYY-MM-DD")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
               
                 {getSellReportWithDateSuccess==='bad date formate' && <p style={{color:'red'}}>start date is gater then end date</p>}
               
                 <div class="calendar__buttons">
       
               
                   <button onClick={getRportWithGiveDate} style={{float:'right'}} class="calendar__button calendar__button--primary">Get Data</button>
                 </div>
               </div>
             </div>
           </div>
           <div class="top-sales box">
             <div class="title">Product details</div>
             <ul class="top-sales-details">
               <li>
               <a href="#">
                 <span class="product">Totall Sales</span>
               </a>
               <span class="price">{getSellReportWithDateSuccess && getSellReportWithDateSuccess.numberOFSell}</span>
             </li>
             <li>
               <a href="#">
                 <span class="product">Totall Earn </span>
               </a>
               <span class="price">${getSellReportWithDateSuccess &&  getSellReportWithDateSuccess.revenue &&
                getSellReportWithDateSuccess.revenue.music__price__sum}</span>
             </li>
           
             </ul>
           </div>
          
         </div>
       </div>
       <br />
       <div class="cardDatalist">
         <div style={{overflowX:'auto'}}>
           <table class="songDetails">
             <tr>
               <th>Song Name</th>
               <th>Price</th>
               {/* <th>Count</th> */}
               
             </tr>
             {getSellReportWithDateSuccess && getSellReportWithDateSuccess.ListOfSoldItem &&
             
             getSellReportWithDateSuccess.ListOfSoldItem.map(data=>(
                <tr>
               <td>{data.music.title}</td>
               <td>${data.music.price}</td>
               {/* <td>10</td> */}
              
             </tr>
             ))}
             
             
           </table>
         </div>
         </div>
       </div>
            
        </div>
    )
}

export default SellReport
