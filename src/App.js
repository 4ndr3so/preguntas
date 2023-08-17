import logo from './logo.svg';
import './App.css';
import Pregunta from "./components/Pregunta"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Skeleton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import  { apijsonConvo,fetchData } from "./api/api"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { selectAllDataPregun, getDataPregunStatus,getDataPregunError, getDataByCategoty, seleccionarData, getDatoPregSelect } from './redux/Slices/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'





const SenaButton = styled(Button)({
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#000',
  width:"100%",
  fontFamily: [
    'Calibri',

  ].join(','),
  '&:hover': {
    backgroundColor: '#424141',
    color:'#ffffff'
  },
  '&:active': {
    backgroundColor: '#dcdcdc',
    color:'#000'
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
  '&:activeBtn': {
    backgroundColor: '#323232',
    color:'#000'
  }
});


function App() {
 
  const datosStatus=useSelector(getDataPregunStatus);
  const datosPreg=useSelector(selectAllDataPregun)
  const datosPregCatego=useSelector(getDataByCategoty);
  const datosPregSelec=useSelector(getDatoPregSelect);
  const dispatch=useDispatch();
  const [select,setSelect]=useState("Formación Titulada")
  useEffect(() => {
      if(datosStatus==="idle"){
        //console.log("carga data")
        dispatch(fetchData())  
      }
    
  }, [datosStatus, dispatch])

  useEffect(() => {
    if(datosStatus==="succed"){
      //console.log("cambia data 1")
      dispatch(seleccionarData("Formación Titulada"))  
    }
  
}, [datosStatus, dispatch])

const habiliSkele=["","","","","",""]

const skeleNotPreg=habiliSkele.map((element,index)=>
{

 return <Grid item xs={12} md={4} key={index}>
   <div className="mt-3 " style={{marginRight:"20px"}}>
     
     <Skeleton variant="rectangular"  height={20}></Skeleton>
     <Skeleton variant="rounded"   height={30} ></Skeleton></div> 
     </Grid>
})
  const cambiaInfo=(event,text)=>{
    //console.log(text)
    dispatch(seleccionarData(text))  
    setSelect(text)
  }


  return (
    <div className="App">
      
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
      { datosStatus==="loading" || datosStatus==="idle"? skeleNotPreg:
       Object.entries(datosPregCatego).map((element, index) => {
       //console.log(element)
        return <Grid item xs={6} key={nanoid()}>
          <SenaButton variant="contained" color={element[1].categoria=== select ?"neutral":"sena"} endIcon={<AddBoxIcon />} onClick={event=>cambiaInfo(event,element[1].categoria)}>{element[1].categoria}</SenaButton>
        </Grid>
        }) 
      }
      </Grid>
      { datosStatus==="succed" && datosPregSelec[0] && <div className="titulo"><p>{datosPregSelec[0].categoria}</p> </div>}
      <Grid container spacing={2} style={{marginTop:"20px"}}>
      <Grid item xs={12}>
          <Pregunta ></Pregunta>
        </Grid>
      </Grid>
      
        
        
      
    </ThemeProvider>
    </div>
  );
}

export default App;


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    sena: {
      main: '#fff',
      darker: '#dcdcdc',
      contrastText: '#000000'
    },
    neutral: {
      main: '#5e636e',
      contrastText: '#fff',
    },
  },
});