import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

const initialState={
    records:[],
    status:"idle",
    error:null,
    categorias:[],
    dataselecionada:[]
    }
export const dataPregSlice=createSlice({
    name:"dataPreg",
    initialState,
    reducers:{
            seleccionarData(state,action){
                
                const tempArr=[action.payload]
         
                //actionpayload debe ser array
              const dataSele=  state.records.filter( i => tempArr.includes( i.categoria ) );
       
                state.dataselecionada=dataSele;
            },
            prub:(state)=>{
                return state;
            },
    },extraReducers(builder){
        builder
            .addCase(fetchData.pending,(state,action)=>{
               // console.log(state.status)
                state.status="loading"
            })
            .addCase(fetchData.fulfilled,(state,action)=>{
                console.log("cargada")
                state.status="succed"
                state.records=action.payload;
            })
            .addCase(fetchData.rejected,(state,action)=>{
                //console.log("error")
                state.status="fail";
                state.error=action.error.message
            })
    }

})


export const selectAllDataPregun=(state)=>state.dataPreg.records;
export const getDataPregunStatus=(state) =>state.dataPreg.status;
export const getDataPregunError=(state) =>state.dataPreg.error;
export const getDataByCategoty=(state)=>state.dataPreg.records.filter((value, index, self) =>
index === self.findIndex((t) => (
  t.categoria === value.categoria
))
)
export const getDatoPregSelect=(state)=>state.dataPreg.dataselecionada;

export const {prub,seleccionarData} = dataPregSlice.actions;

export default dataPregSlice.reducer;