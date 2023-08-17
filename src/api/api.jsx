import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const url = "./assets/preguntas.xml";  



const getUrl=function(){
    var loc1=window.location;
    var str = ""+loc1;
    var n = str.indexOf("/ciudadano");
    //console.log(str.slice(0,n+10))
    return str.slice(0,n+10)
}
const url = getUrl()+"/_api/web/lists/getbytitle('preguntas_frecuentes')/items?$top=1000";
/*
 const response =await axios.get(url).then(data=>{
            const datos={records:[]}
            //console.log(data.data)
           var parser =new window.DOMParser()
           var xmlDoc=parser.parseFromString(data.data, "text/xml")
              //console.log(xmlDoc)
              var arrEntry=xmlDoc.querySelectorAll("entry")
              arrEntry.forEach((it)=>{
               // console.log(it.getElementsByTagName("d:Title") && it.getElementsByTagName("d:Title")[0].childNodes[0].nodeValue)
                  //console.log(it[0].getElementsByTagName("d:Id")[0].childNodes[0].nodeValue)
                  datos.records.push({
                    "categoria":it.getElementsByTagName("d:categoria") && it.getElementsByTagName("d:categoria")[0].childNodes[0].nodeValue,
                    "pregunta":it.getElementsByTagName("d:Title") && it.getElementsByTagName("d:Title")[0].childNodes[0].nodeValue,
                    "respuesta":it.getElementsByTagName("d:Respuesta") && it.getElementsByTagName("d:Respuesta")[0].childNodes[0].nodeValue,
                    "activo":it.getElementsByTagName("d:Activa") && it.getElementsByTagName("d:Activa")[0].childNodes[0].nodeValue
                  })
              })
              console.log(datos.records)
              return datos.records;
           })
           return response;
*/
export const fetchData= createAsyncThunk('preguntas/fetchPreguntas',async()=>{
    
    try {
        const response =await axios.get(url).then(data=>{
            const datos={records:[]}
            //console.log(data.data)
           var parser =new window.DOMParser()
           var xmlDoc=parser.parseFromString(data.data, "text/xml")
              //console.log(xmlDoc)
              var arrEntry=xmlDoc.querySelectorAll("entry")
              arrEntry.forEach((it)=>{
               // console.log(it.getElementsByTagName("d:Title") && it.getElementsByTagName("d:Title")[0].childNodes[0].nodeValue)
                  //console.log(it[0].getElementsByTagName("d:Id")[0].childNodes[0].nodeValue)
                  datos.records.push({
                    "categoria":it.getElementsByTagName("d:categoria") && it.getElementsByTagName("d:categoria")[0].childNodes[0].nodeValue,
                    "pregunta":it.getElementsByTagName("d:Title") && it.getElementsByTagName("d:Title")[0].childNodes[0].nodeValue,
                    "respuesta":it.getElementsByTagName("d:Respuesta") && it.getElementsByTagName("d:Respuesta")[0].childNodes[0].nodeValue,
                    "activo":it.getElementsByTagName("d:Activa") && it.getElementsByTagName("d:Activa")[0].childNodes[0].nodeValue
                  })
              })
             // console.log(datos.records)
              return datos.records;
           })
           return response;
    } catch (error) {
        return error.message;
        
    }
})

export const apijsonConvo=() => fetch(url)
                .then(response => response.text())
                .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                .then(data => console.log(data))