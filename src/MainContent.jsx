
import "./Main.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import  hafla from "../public/img/imgg.JPG"
import axios from "axios"
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MainContent() {
const cities = [
  {
    displayName: "الجزائر",
    apiName: "Alger"
  },
  {
    displayName: "وهران",
    apiName: "Oran"
  },
  {
    displayName: "قسنطينة",
    apiName: "Constantine"
  },
  {
    displayName: "عنابة",
    apiName: "Annaba"
  },
  {
    displayName: "سطيف",
    apiName: "Setif"
  },
  {
    displayName: "سعيدة",
    apiName: "Saida"
  }
];

const[timing , setTiming] = useState({
    displayName: "سعيدة",
    apiName: "Saida"
  })
const[cityselected , setCityselected ]= useState({})

function HandleCitychanged(event){
  const cityObject= cities.find((city)=>{
return city.apiName === event.target.value
  })
setCityselected(cityObject);
  localStorage.setItem("selectedCity", cityObject.apiName);


}



useEffect(()=>{
  axios.get(`http://api.aladhan.com/v1/timingsByCity?country=DZ&city=${cityselected.apiName}`)
  .then(function (response) {

    setTiming(response.data.data.timings)
    
  
  })
  .catch(function (error) {
    // handle error
    console.error( "fetching data failed",error);
  })
},[cityselected])







  return (
    <div className='container'>
        <div className="header">
       
 <div className="secondhalf">
        <h2>
          15 mai 2025
        </h2>
        <h1>
    {cityselected.displayName}
  
        </h1>
        </div>


        <div className="firsthalf">
        <h2>
          متبقي لصلاة   
        </h2>
        <h1>
          1 : 23 : 58
        </h1>
        </div>
         
       

        </div>
     <hr className="lign"/>

{/* secondchap */}

        <div className='details'>
<Swiper
    
        slidesPerView={5}
  
        spaceBetween={15}
       className="mySwiper"
      >
        <SwiperSlide className="swiperslide"  >
        <div className="card">
      
       <img src={hafla} className="img"/>
       
        <div className="detailss">
          <h2> الفجر</h2>
          <h1>{timing.Fajr}</h1>
        </div>
        </div>
        </SwiperSlide>
            <SwiperSlide className="swiperslide">
        <div className="card">
      
       <img src={hafla} className="img"/>
       
        <div className="detailss">
          <h2>الظهر</h2>
          <h1>{timing.Dhuhr}</h1>
        </div>
        </div>
        </SwiperSlide>
            <SwiperSlide className="swiperslide">
        <div className="card">
      
       <img src={hafla} className="img"/>
       
        <div className="detailss">
          <h2>العصر</h2>
          <h1>{timing.Asr}</h1>
        </div>
        </div>
        </SwiperSlide>
            <SwiperSlide className="swiperslide">
        <div className="card">
      
       <img src={hafla} className="img"/>
       
        <div className="detailss">
          <h2>المغرب</h2>
          <h1>{timing.Maghrib}</h1>
        </div>
        </div>
        </SwiperSlide>
            <SwiperSlide className="swiperslide">
        <div className="card">
      
       <img src={hafla} className="img"/>
       
        <div className="detailss">
          <h2>العشاء</h2>
          <h1>{timing.Isha}</h1>
        </div>
        </div>
        </SwiperSlide>
       
        
      </Swiper>
        </div>
      <div className="select">


<Stack spacing={2} className="stak">
 <FormControl className="form">
  <InputLabel id="demo-simple-select-label" className="inpuut">المدينة</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label=""
   value={cityselected}
   onChange={ HandleCitychanged}
  >
    {cities.map((t, index)=>{
      return <MenuItem  key={ index} value={t.apiName}>{t.displayName}</MenuItem>
  
    })} 
  </Select>
</FormControl>
</Stack>
      </div>
    </div>



  )
}

export default MainContent
